(async () => {
  const expected = [
    ['Checked out', 'Guest checked out. Room 301 is marked for cleaning.'],
    ['To clean', 'Room 301 is ready for cleaning. Assigned to your shift.'],
    ['Being cleaned', 'Room 301 is ready for cleaning.'],
    ['To inspect', '301 clean'],
    ['To inspect', 'Room 301 ready for inspection. Please review.'],
    ['Ready', 'Inspection passed. Room 301 is Ready.'],
    ['Ready', 'Room 301 is available. Front desk is up to date.'],
  ];
  const wait = () => new Promise(resolve => setTimeout(resolve, 220));
  const track = document.querySelector('.workflow-track');
  const scene = document.querySelector('.workflow-scene');
  const failures = [];
  const checks = [];
  const assert = (condition, message) => { if (!condition) failures.push(message); };
  await document.fonts.ready;
  await wait();
  assert(track.dataset.scrollMode === 'true', 'scroll mode must be enabled at this viewport');
  const top = parseFloat(getComputedStyle(scene).top);
  const start = track.getBoundingClientRect().top + scrollY - top;
  const travel = parseFloat(track.style.getPropertyValue('--workflow-travel'));
  assert(travel > 0, 'finite travel must exist');
  function inspect(index, phase) {
    const stage = Number(scene.dataset.stepIndex);
    const message = scene.querySelector('.wa-bubble p').textContent.trim();
    const status = scene.querySelector('.workflow-room > .status').textContent.trim();
    const completed = scene.querySelectorAll('.workflow-step.completed').length;
    const current = scene.querySelector('.workflow-step[aria-current="step"]');
    const r = scene.getBoundingClientRect();
    assert(stage === index, `${phase}: expected stage ${index}, got ${stage}`);
    assert(message === expected[index][1], `${phase}: message out of sync at ${index}`);
    assert(status === expected[index][0], `${phase}: status out of sync at ${index}`);
    assert(completed === index + 1, `${phase}: wrong completed count at ${index}: ${completed}`);
    assert(Number(current?.dataset.stepIndex) === index, `${phase}: current control mismatch`);
    assert(r.top >= top - 2 && r.bottom <= innerHeight + 2, `${phase}: sticky scene clipped at ${index}: ${r.top}..${r.bottom}`);
    assert((index === 3) === !!scene.querySelector('.wa-bubble.wa-outgoing'), `${phase}: wrong incoming/outgoing message`);
    checks.push({phase,index,stage,completed,status,message,sceneTop:Math.round(r.top),sceneBottom:Math.round(r.bottom)});
  }
  for (const phase of ['forward', 'reverse']) {
    const indices = phase === 'forward' ? [0,1,2,3,4,5,6] : [6,5,4,3,2,1,0];
    for (const index of indices) {
      window.scrollTo({top:start + travel * index / 6,behavior:'instant'});
      await wait();
      inspect(index,phase);
    }
  }
  window.scrollTo({top:start + travel,behavior:'instant'});
  window.scrollTo({top:start + travel / 2,behavior:'instant'});
  await wait(); inspect(3,'rapid jump');
  for (const index of [6,2,4]) {
    scene.querySelector(`.workflow-step[data-step-index="${index}"]`).click();
    await wait(); inspect(index,'manual control');
  }
  for (let i=0;i<2;i++) {
    scene.querySelector('.workflow-play').click();
    await wait(); inspect(0,'replay');
    scene.querySelector('.workflow-step[data-step-index="6"]').click();
    await wait(); inspect(6,'replay setup');
  }
  window.scrollTo({top:start + travel + innerHeight,behavior:'instant'});
  await wait();
  assert(scene.getBoundingClientRect().bottom < innerHeight, 'scene must release after scroll track');
  assert(document.documentElement.scrollWidth === innerWidth, 'page horizontal overflow');
  return JSON.stringify({viewport:[innerWidth,innerHeight],passed:failures.length===0,failures,checks});
})()

