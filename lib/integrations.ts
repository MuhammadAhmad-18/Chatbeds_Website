export const integrationPages = {
  whatsapp: {
    label: "WhatsApp operations",
    eyebrow: "WHATSAPP + CHATBEDS",
    title: "A familiar conversation.",
    accent: "A complete property operation.",
    description:
      "Connect your frontline team to the PMS through WhatsApp. Staff receive operational alerts and report work without returning to a desktop for every update.",
    mode: "housekeeping" as const,
    storyTitle: "The message is connected to the work.",
    story:
      "When a guest checks out, ChatBeds updates the room status and alerts the people responsible for the next step. A cleaner can reply with 301 clean, the supervisor receives an inspection notification, and front desk sees the room become Ready in the PMS.",
    features: [
      {
        title: "Link staff to their role",
        text: "Connect staff profiles and WhatsApp numbers, then review shifts, on-duty status and the alerts relevant to each team.",
      },
      {
        title: "Receive and report operational work",
        text: "Use housekeeping replies, maintenance reports and inventory commands. Voice notes are part of the operational workflow too.",
      },
      {
        title: "Keep the PMS as the shared record",
        text: "Room readiness, maintenance tickets and stock changes remain connected to the same platform used by management and front desk.",
      },
    ],
    setup: [
      "Your hotel WhatsApp number and existing staff communication",
      "Staff linking, shifts and the roles responsible for each alert",
      "Cleaning completion and supervisor inspection handovers",
      "Commands and voice-note workflows your team will use",
    ],
    faq: [
      {
        question: "Is ChatBeds just a WhatsApp bot?",
        answer:
          "No. ChatBeds is a complete PMS covering reservations, rooms, front desk, operations, finance, revenue, guest experience and reports. WhatsApp is an interface for staff to receive and update work.",
      },
      {
        question: "What should we walk through in a demo?",
        answer:
          "Bring a real checkout, cleaning or maintenance handover. We can review the staff conversation alongside the PMS records and the roles that need to see each update.",
      },
    ],
  },
  "guest-messaging": {
    label: "Guest messaging",
    eyebrow: "GUEST CONVERSATIONS + CHATBEDS",
    title: "Every guest conversation.",
    accent: "Part of the same stay.",
    description:
      "Bring your hotel’s WhatsApp guest messages into a Unified Inbox. Connect replies, messaging flows and the guest journey with the platform running your property.",
    mode: "guest" as const,
    storyTitle: "Give the team the context behind the message.",
    story:
      "Guest communication belongs alongside the rest of the stay. ChatBeds brings hotel WhatsApp conversations into one inbox and supports AI-assisted reply drafting, so your team can review the response before it is sent.",
    features: [
      {
        title: "One place for guest WhatsApp messages",
        text: "Work through guest conversations in the Unified Inbox, alongside the wider guest experience tools in ChatBeds.",
      },
      {
        title: "Useful help with the reply",
        text: "Use AI-assisted drafts to prepare a response. A draft stays clearly separate from a message that has been sent.",
      },
      {
        title: "Connect the moments of a stay",
        text: "Review trigger-based messages, check-in and checkout journeys, the guest portal, and relevant upsells or add-ons.",
      },
    ],
    setup: [
      "Your hotel WhatsApp number and guest-facing communication",
      "Who manages the inbox and reviews assisted replies",
      "The messages needed before, during and after a stay",
      "Guest portal and add-on journeys relevant to your property",
    ],
    faq: [
      {
        question: "Are AI drafts automatically sent?",
        answer:
          "AI-assisted drafting helps the team prepare a reply. The example here shows an unsent draft for a team member to review, not an automatically delivered message.",
      },
      {
        question: "Can we review guest journeys in a demo?",
        answer:
          "Yes. Bring examples of check-in, stay and checkout messages so the conversation can cover messaging flows, the guest portal and relevant add-ons.",
      },
    ],
  },
  distribution: {
    label: "Distribution & calendars",
    eyebrow: "DISTRIBUTION + CHATBEDS",
    title: "Your rooms, rates and channels.",
    accent: "A connected commercial picture.",
    description:
      "Manage distribution and calendar synchronization alongside the PMS. Review availability, linked rooms and rate plans in the same platform that manages the property.",
    mode: "distribution" as const,
    storyTitle: "Connect where you sell with what you can sell.",
    story:
      "Distribution tools belong with your room and reservation records. ChatBeds brings Airbnb, Booking.com and Vrbo distribution capabilities together with calendar sync, linked rooms, rate plans and channel closing.",
    features: [
      {
        title: "Availability and calendar synchronization",
        text: "Keep availability synchronization and calendar connections in view alongside property reservations and rooms.",
      },
      {
        title: "Linked rooms and rate plans",
        text: "Review how rooms and rate plans relate to the channels used by your property.",
      },
      {
        title: "Commercial oversight",
        text: "Use channel closing, rate grids, seasonal rules and change history as part of the wider commercial toolset.",
      },
    ],
    setup: [
      "The channels and calendars you currently use",
      "Property, room and room-type mapping",
      "Rate plans, restrictions and channel-closing needs",
      "Your availability synchronization and review workflow",
    ],
    faq: [
      {
        question: "Which platforms can we discuss?",
        answer:
          "The ChatBeds distribution toolset covers Airbnb, Booking.com, Vrbo and calendar synchronization. Review your specific account and property requirements with the team.",
      },
      {
        question: "What should we bring to a distribution demo?",
        answer:
          "A list of your channels, properties, room types and rate plans helps focus the conversation on the connections and availability workflow you need.",
      },
    ],
  },
} as const;
export type IntegrationSlug = keyof typeof integrationPages;
