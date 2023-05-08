export type SelectorConfig = {
  id: number;
  title: string;
  route: string;
  heading: string;
  description: string;
};

export const selectorConfig: SelectorConfig[] = [
  {
    id: 1,
    title: "Home move",
    route: "/move/domestic",
    heading: "Looking to move your home? Get an instant quote.",
    description: "Get free quote for your home move",
  },
  {
    id: 3,
    title: "Storage",
    route: "/storage",
    heading: "Looking for storage? Get an instant quote.",
    description:
      "Get your free instant quote in Gauteng, for Kwazulu-Natal, or Cape Town please give us your contact information and a specialist will assist you.",
  },
];
