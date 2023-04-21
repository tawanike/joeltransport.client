export type ProductConfig = {
  id: number;
  title: string;
  description: string;
  image?: string;
  route: string;
  cta?: string;
};

export const productConfig: ProductConfig[] = [
  {
    id: 1,
    title: "Home moves",
    description:
      "We have well-trained, reliable experts who offer a comprehensive moving service. This full-service option ensures minimal stress during your home move. All documents and furniture are packed and moved with great care.",
    image: "home_moves.png",
    route: "home-moves",
  },
  {
    id: 2,
    title: "Office removals",
    description:
      "To successfully undertake professional office removals requires significant expertise and a detailed plan of action. Joël Transport are the experts when planning and executing office furniture removals.",
    image: "office_removals.png",
    route: "office-removals",
  },
  {
    id: 3,
    title: "Storage",
    description:
      "We provide storage facilities for your personal and household belongings. There are short and long-term storage contracts, and loads are stored in pallets within our warehouse. Storage in Gauteng is also available.",
    image: "storage.png",
    route: "storage",
  },
  {
    id: 4,
    title: "Pet relocation",
    description:
      "We provide domestic and international pet moving services at reasonable pricing. Our teams are trustworthy and adhere to local and international regulations on the movement of pets.",
    image: "pet.png",
    route: "specialized-services",
  },

  {
    id: 5,
    title: "Fine art relocation",
    description:
      "We move fine art pieces both domestically and internationally in safe and secure packaging and/ or crating. This service is backed up by our insurance service option.",
    image: "art.png",
    route: "specialized-services",
  },
  {
    id: 6,
    title: "Vehicle transportation",
    description:
      "We provide domestic and international vehicle moving services for vehicles that can move using their own power. Moving of non-runner vehicles is significantly costlier, with limited service options.",
    image: "vehicle.png",
    route: "specialized-services",
  },
  {
    id: 7,
    title: "Dangerous goods",
    description:
      "Our Dangerous Goods service option uses highly trained specialist teams. The dangerous goods we move include paints, chemicals, flammable gases, flammable liquids and solids/corrosives.",
    image: "danger.png",
    route: "specialized-services",
  },
];

export const articleConfig: ProductConfig[] = [
  {
    id: 1,
    title: "The mayhem of moving",
    description:
      "Moving is said to be one of the most stressful events of a person’s life. To avoid the pressure that moving places on you, it’s advisable to make use of a professional moving company.",
    route: "",
    cta: "Read this article.",
  },
  {
    id: 2,
    title: "Am I forgetting something?",
    description:
      "When you have a lot to take care of, it’s easy for some things to slip through the cracks. A checklist of all the tasks you need to take care of, and all the items you need to take, is useful. That “I feel like I’m forgetting something!” feeling is sorted. Easy.",
    route: "",
    cta: "Home checklist",
  },
  {
    id: 3,
    title: "Getting your office in order",
    description:
      "Are you sure that you have done all that you need to do before you move? Get your ‘office in order’ with this useful checklist.",
    route: "",
    cta: "Office checklist",
  },
];
