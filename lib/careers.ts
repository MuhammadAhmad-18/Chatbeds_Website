export type OpenPosition = {
  id: string;
  title: string;
  description: string;
  department?: string;
  location?: string;
  employmentType?: string;
  applicationUrl: string;
};

// Add only approved, current roles with a real HTTPS or mailto application URL.
// No vacancies have been supplied for publication yet.
export const openPositions: readonly OpenPosition[] = [];
