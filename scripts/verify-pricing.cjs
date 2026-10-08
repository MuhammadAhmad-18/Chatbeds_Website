/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS dev-only TypeScript loader. */
// Development-only arithmetic check: node scripts/verify-pricing.cjs
// Uses the existing TypeScript dependency; no runtime/test dependency is added.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const ts = require("typescript");
const previousLoader = require.extensions[".ts"];
require.extensions[".ts"] = (module, filename) => {
  const { outputText } = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    fileName: filename,
  });
  module._compile(outputText, filename);
};

try {
  const { getCountry } = require("../lib/pricing/countries.ts");
  const { calcPayAsYouStay, calcPlanPrice, calcFoundingPrice } = require("../lib/pricing/calculate.ts");
  const { hasFoundingOffer } = require("../lib/pricing/config.ts");
  const country = getCountry("PK");
  for (const [rooms, occupancyPct, nightsSold, cost, proMonthly, cheaperPlan] of [
    [20, 55, 330, 9240, 8400, "pro"],
    [20, 30, 180, 5040, 8400, "payg"],
    [50, 55, 825, 23100, 21000, "pro"],
    [60, 55, 990, 27720, 21400, "pro"],
  ]) {
    const result = calcPayAsYouStay({ country, rooms, occupancyPct });
    for (const [key, expected] of Object.entries({ nightsSold, cost, proMonthly, cheaperPlan })) {
      assert.equal(result[key], expected, `${rooms} rooms / ${occupancyPct}%: ${key}`);
    }
    assert.equal(result.difference, Math.abs(cost - proMonthly));
    console.log(`${rooms} rooms, ${occupancyPct}%: ${result.nightsSold} nights; PAYG PKR ${result.cost.toLocaleString("en")}; Pro PKR ${result.proMonthly.toLocaleString("en")}; ${result.cheaperPlan} cheaper by PKR ${result.difference.toLocaleString("en")}; break-even ${result.breakEvenOccupancyPct.toFixed(2)}%.`);
  }
  for (const [plan, expected] of [["essentials", 5000], ["pro", 8400]]) {
    assert.equal(calcPlanPrice({ country, plan, rooms: 20, billing: "monthly" }).monthlyTotal, expected);
    assert.equal(calcPlanPrice({ country, plan, rooms: 20, billing: "yearly" }).billedAmount, expected * 10);
  }
  assert.equal(calcPlanPrice({ country, plan: "pro", rooms: 60, billing: "monthly" }).volumeDiscountPct, 15);
  assert.equal(calcPlanPrice({ country, plan: "free", rooms: 4, billing: "monthly" }).available, false);
  assert.equal(calcPlanPrice({ country, plan: "group", rooms: 20, billing: "monthly" }).billedAmount, null);
  for (const code of ["US", "OTHER"]) {
    assert.equal(calcPayAsYouStay({ country: getCountry(code), rooms: 20, occupancyPct: 55 }), null);
    assert.equal(calcPlanPrice({ country: getCountry(code), plan: "pro", rooms: 20, billing: "monthly" }).billedAmount, null);
  }
  console.log("PASS: monthly/yearly totals, volume discount, Free eligibility, Group quote-only and pending countries.");
  if (process.env.NEXT_PUBLIC_FOUNDING_100_ENABLED === "true") {
    assert.equal(hasFoundingOffer(country), true);
    for (const [plan, expected] of [["essentials", 3000], ["pro", 5000]]) {
      const monthly = calcFoundingPrice({ country, plan, rooms: 20, billing: "monthly" });
      assert.equal(monthly.monthlyTotal, expected);
      assert.equal(calcFoundingPrice({ country, plan, rooms: 20, billing: "yearly" }).billedAmount, expected * 10);
    }
    assert.equal(calcFoundingPrice({ country, plan: "pro", rooms: 60, billing: "monthly" }).monthlyTotal, 15100);
    for (const plan of ["free", "group"]) assert.equal(calcFoundingPrice({ country, plan, rooms: 20, billing: "monthly" }), null);
    assert.equal(calcFoundingPrice({ country: getCountry("US"), plan: "pro", rooms: 20, billing: "monthly" }), null);
    console.log("PASS: Founding enabled for PK Essentials/Pro only; 20 rooms PKR 3,000 / PKR 5,000 monthly; yearly PKR 30,000 / PKR 50,000; 60-room Pro PKR 15,100, no stacking.");
  } else {
    assert.equal(hasFoundingOffer(country), false);
    assert.equal(calcFoundingPrice({ country, plan: "pro", rooms: 20, billing: "monthly" }), null);
    console.log("PASS: Founding disabled; no promotional price is returned.");
  }
  console.log("TODO: confirm PAYG volume discount policy. Current PAYG rate remains PKR 28 per sold night, including at 60 rooms.");
} finally {
  if (previousLoader) require.extensions[".ts"] = previousLoader;
  else delete require.extensions[".ts"];
}
