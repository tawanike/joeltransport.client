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
      "We have well-trained reliable experts who offer a comprehensive moving full service to ensure minimal stress during your home move. We ensure that packing of documents is done and furniture is moved with great care.",
    image: "home_moves.png",
    route: "home-moves",
  },
  {
    id: 2,
    title: "Office removals",
    description:
      "To successfully undertake professional Office Removals requires significant expertise and a detailed plan for action. Joel Transport are the experts when planning and executing office furniture removals...",
    image: "office_removals.png",
    route: "office-removals",
  },
  {
    id: 3,
    title: "Storage",
    description:
      "We provide storage facilities for your personal and household effects. We offer short and long-term storage contracts. Loads are stored in Pallets within our warehouse. With storage in Gauteng...",
    image: "storage.png",
    route: "storage",
  },
  {
    id: 4,
    title: "Pet relocation",
    description:
      "We provide domestic and international Pet Moving Services using our trusted pet removal teams working to the local and international regulations on the movement of pets.",
    image: "pet.png",
    route: "specialized-services",
  },

  {
    id: 5,
    title: "Fine art relocation",
    description:
      "We move Fine Art pieces domestically and internationally in safely packaged and secure packaging and/or crating to prevent damage. This service is backed up by our insurance service option.",
    image: "art.png",
    route: "specialized-services",
  },
  {
    id: 6,
    title: "Vehicle transportation",
    description:
      "We provide domestic and international Vehicle Moving services, for vehicles that can move using their own power. Moving of non-runner vehicles is significantly more costly, with limited-service options.",
    image: "vehicle.png",
    route: "specialized-services",
  },
  {
    id: 7,
    title: "Dangerous goods",
    description:
      "Our Dangerous Goods moving service uses highly trained specialist teams. Dangerous goods we move include Paints, Chemicals, Flammable Gases, Flammable Liquids and Solids or Corrosives.",
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
