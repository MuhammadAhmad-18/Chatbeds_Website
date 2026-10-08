export const company = {
  name: "ChatBeds™",
  description:
    "ChatBeds™ is the world's first complete Property Management System that lives inside WhatsApp. Empowering modern hotel general managers, housekeeping, and revenue teams to operate without desktop friction.",
  parentName: "Bang Tech Inc.",
  parentUrl: "https://bangtech.io/",
  address: "131 Continental Dr Suite 305, Newark, DE, 19713 US",
  phone: "+1 (601) 978-7767",
  phoneHref: "tel:+16019787767",
  email: "contact@chatbeds.app",
} as const;

export const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || company.email;
