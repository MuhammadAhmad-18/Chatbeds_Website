import { company } from "./company";

export type LegalSection = {
  id: string;
  title: string;
  paragraphs: readonly string[];
  links?: readonly { label: string; href: string }[];
};

export type LegalPolicy = {
  title: string;
  introduction: string;
  sections: readonly LegalSection[];
  relatedPolicy: { label: string; href: string };
};

export const privacyPolicy: LegalPolicy = {
  title: "Privacy Policy",
  introduction: `This starter policy describes the ChatBeds marketing website and enquiries sent to its team. ChatBeds is a product of ${company.parentName}. Privacy details for the complete PMS application, including property, staff and guest records, require a separate confirmed notice.`,
  sections: [
    {
      id: "privacy-information",
      title: "Information you provide",
      paragraphs: [
        "Contact enquiries can include your name, email address and message. A demo enquiry can also include a property name, property type and room or unit count. Share the information needed to explain your question or property needs; avoid including guest records, passwords or payment details in a website enquiry.",
        "The current contact and demo enquiry forms prepare a draft in your email app. They do not automatically submit your details to ChatBeds. You review the draft and choose whether to send it. Your email provider handles the draft and delivery under its own policies.",
      ],
    },
    {
      id: "privacy-purpose",
      title: "How enquiry information is used",
      paragraphs: [
        "Information you send helps the team understand and respond to your enquiry, discuss the needs of your property and arrange a product demonstration. Include relevant context so the conversation can focus on your requirements. The final policy will describe any additional confirmed uses and the service providers involved in handling enquiries.",
      ],
    },
    {
      id: "privacy-external",
      title: "Links and external services",
      paragraphs: [
        "Login takes you to the ChatBeds application at app.chatbeds.app. A demo booking link may open an external calendar when that booking destination is configured. Email apps, calendar services and other linked websites have their own privacy notices. Review those notices before sharing information through an external service; this page does not describe all of their data practices.",
      ],
    },
    {
      id: "privacy-technical",
      title: "Cookies and technical information",
      paragraphs: [
        "Analytics and advertising tracking tools have not been added to this marketing website. Hosting or other infrastructure services may handle technical request information. The details of provider logs, cookies, sharing and related service providers need confirmation before this policy is finalized. This draft does not mean that visiting the website produces no technical information.",
      ],
    },
    {
      id: "privacy-choices",
      title: "Retention and your choices",
      paragraphs: [
        "Retention periods for enquiry information have not yet been confirmed. You can contact the team to ask about information you have sent or request access, correction or deletion. Include enough context to identify the enquiry, without sending sensitive documents unnecessarily. The final policy will explain request handling and applicable rights; this draft does not specify a response or deletion deadline.",
      ],
    },
  ],
  relatedPolicy: { label: "Terms and Conditions", href: "/terms" },
};

export const termsAndConditions: LegalPolicy = {
  title: "Terms and Conditions",
  introduction: "These starter terms describe basic use of the ChatBeds marketing website and its enquiry tools. They do not replace the subscription agreement or service terms agreed with a customer. Those documents should confirm the terms of using the PMS for your property.",
  sections: [
    {
      id: "terms-product",
      title: "Product information",
      paragraphs: [
        "ChatBeds is a complete property management system with WhatsApp as a frontline operating interface. The website explains capabilities such as reservations, rooms, housekeeping, maintenance, finance, rates, distribution, guest communication and reports. Your actual access and included features depend on the plan and service arrangements agreed for your property. Discuss your requirements with the team before subscribing.",
      ],
    },
    {
      id: "terms-use",
      title: "Responsible website use",
      paragraphs: [
        "Provide accurate enquiry details and share only information you are authorized to provide. Do not include confidential guest data, passwords or payment details in website messages. Do not misuse the website, attempt unauthorized access, interfere with its operation or infringe another person's rights.",
        "Enquiry forms prepare an email draft rather than automatically sending a message. Review its contents and choose whether to send it from your email app. An enquiry is a request for a conversation, not a confirmed booking, subscription or service agreement.",
      ],
    },
    {
      id: "terms-accounts",
      title: "Application accounts",
      paragraphs: [
        "The Login link opens app.chatbeds.app. If you use an application account, protect your credentials and make sure staff access is authorized by your property. Account use is governed by the applicable customer and application terms. The marketing website does not create an account or change staff access through an enquiry.",
      ],
    },
    {
      id: "terms-pricing",
      title: "Plans, billing and cancellation",
      paragraphs: [
        "The Pricing page uses the selected country, currency, room count and billing option to show available plan calculations. Group pricing is quoted. Confirm the plan, price and service terms for your property before subscribing; enquiries and calculator estimates are not a replacement for that agreement.",
        "The approved plan information allows free data export at any time and cancellation of monthly plans at any time. Annual cancellation, refunds, taxes and renewal arrangements require confirmation in the agreed service terms. No additional trial, refund or money-back guarantee is created by this draft.",
      ],
      links: [{ label: "View pricing", href: "/pricing" }],
    },
    {
      id: "terms-brands",
      title: "Branding and external services",
      paragraphs: [
        "ChatBeds branding belongs to its owners. Third-party names and brands belong to their respective owners and are used to describe relevant product capabilities or services. A reference or link does not imply a partnership or endorsement. External application, email and calendar services have their own terms; review them when using those services.",
      ],
    },
    {
      id: "terms-draft",
      title: "About this draft",
      paragraphs: [
        "These basic website terms can be expanded after the company's policies and customer service arrangements are confirmed. No effective date has been assigned to this draft. Contact the team with questions about the website or request the applicable service terms before making a subscription decision.",
      ],
    },
  ],
  relatedPolicy: { label: "Privacy Policy", href: "/privacy" },
};
