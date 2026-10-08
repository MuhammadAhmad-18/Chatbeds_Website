import { paymentText } from "./countries";
import type { CountryPricing } from "./types";
import { trial } from "./config";
export function pricingFAQ(country: CountryPricing) {
  return [
    {
      question: "Can I try ChatBeds for free?",
      answer: `Yes, properties with 1 to 3 rooms can use ChatBeds Free, with no time limit. Larger properties start on Essentials or Pro.${trial.enabled && trial.text.trim() ? ` ${trial.text.trim()}` : ""}`,
    },
    {
      question: "What happens to my data if I cancel?",
      answer: "You can export your data for free at any time, and monthly plans can be cancelled any time.",
    },
    {
      question: "Why do prices differ by country?",
      answer:
        "ChatBeds is priced per room, in your own currency, to match what hotels in your country earn. Every hotel gets the same product.",
    },
    {
      question: "What happens when I add rooms?",
      answer:
        "Your price follows your room count. Larger properties get a lower price per room above 50 and 150 rooms.",
    },
    {
      question: "What if my hotel closes for part of the year?",
      answer:
        "Seasonal Pause lets you pay 20% of your plan for up to 4 closed months a year. Your data and booking page stay live.",
    },
    {
      question: "Do guests pay for WhatsApp messages?",
      answer:
        "No. Pro and Group include a message credit. Above it, you pay Meta’s published rate with no markup.",
    },
    {
      question: "Do you charge commission on bookings?",
      answer:
        "No. Direct bookings through your booking page have 0% commission.",
    },
    {
      question: "Can I change or cancel my plan?",
      answer:
        "Yes. Monthly plans can be cancelled any time, and you can export your data for free.",
    },
    {
      question: "Is there a setup or training fee?",
      answer: "No. There are no setup, training or support fees.",
    },
    {
      question: "How do I pay?",
      answer: `${paymentText(country)}${country.allowsQuarterlyPrepaid ? " Quarterly prepaid billing is also available." : ""}`,
    },
    {
      question: "Is tax included?",
      answer:
        "Prices exclude local sales tax such as VAT or GST, which is added at checkout where required.",
    },
    {
      question: "Will my price change?",
      answer: "Your price changes at most once a year, with 60 days’ notice.",
    },
  ];
}
