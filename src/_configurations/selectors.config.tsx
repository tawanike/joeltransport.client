export type SelectorConfig = {
    id: number,
    title: string,
    route: string,
    heading: string,
    description: string
};

export const selectorConfig: SelectorConfig[] = [
    {
        id: 1,
        title: "Domestic",
        route: "/move/domestic",
        heading: "Looking for moving services? Get an instant quote.",
        description: "Are you in Gauteng planning to move homes, get free quote online."
    },
    {
        id: 2,
        title: "International",
        route: "/move/international",
        heading: "Looking for long distance moving services?",
        description: "For long distance & international services, we’ll need to collect your info & one of our specialist will be in touch."
    },
    {
        id: 3,
        title: "Storage",
        route: "/storage",
        heading: "Looking for storage? Get an instant quote.",
        description: "Get your free instant quote in Gauteng, for Kwazulu-Natal, or Cape Town please give us your contact information and a specialist will assist you."
    }
];
