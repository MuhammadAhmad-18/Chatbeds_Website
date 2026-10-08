export type SocialLink = {
  network: "linkedin" | "instagram" | "facebook" | "youtube" | "website";
  label: string;
  url: string;
};
// TODO: Add only real, approved ChatBeds profile URLs.
export const socials: readonly SocialLink[] = [];
