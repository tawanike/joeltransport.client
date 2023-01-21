export type ProductConfig = {
    id: number,
    title: string,
    description: string,
    image?: string,
    route: string
};

export const productConfig: ProductConfig[] = [
    {
        id: 1,
        title: 'Home moves',
        description: 'We have well-trained reliable experts who offer a comprehensive moving full service to ensure minimal stress during your home move. We ensure that packing of documents is done and furniture is moved with great care.',
        image: 'home_moves.png',
        route: 'home-moves'
    },
    {
        id: 2,
        title: 'Office removals',
        description: 'To successfully undertake professional Office Removals requires significant expertise and a detailed plan for action. Joel Transport are the experts when planning and executing office furniture removals...',
        image: 'office_removals.png',
        route: 'office-removals'
    },
    {
        id: 3,
        title: 'Storage',
        description: 'We provide storage facilities for your personal and household effects. We offer short and long-term storage contracts. Loads are stored in Pallets within our warehouse. With storage in Gauteng...',
        image: 'storage.png',
        route: 'storage'
    },
    {
        id: 4,
        title: 'Pet relocation',
        description: 'We provide domestic and international Pet Moving Services using our trusted pet removal teams working to the local and international regulations on the movement of pets.',
        image: 'pet.png',
        route: 'pet-relocation'
    },

    {
        id: 5,
        title: 'Fine art relocation',
        description: 'We move Fine Art pieces domestically and internationally in safely packaged and secure packaging and/or crating to prevent damage. This service is backed up by our insurance service option.',
        image: 'art.png',
        route: 'fine-art-relocation'
    },
    {
        id: 6,
        title: 'Vehicle transportation',
        description: 'We provide domestic and international Vehicle Moving services, for vehicles that can move using their own power. Moving of non-runner vehicles is significantly more costly, with limited-service options.',
        image: 'vehicle.png',
        route: 'vehicle-transportation'
    },
    {
        id: 7,
        title: 'Dangerous goods',
        description: 'Our Dangerous Goods moving service uses highly trained specialist teams. Dangerous goods we move include Paints, Chemicals, Flammable Gases, Flammable Liquids and Solids or Corrosives.',
        image: 'danger.png',
        route: 'dangerous-goods'
    }
]

export const articleConfig: ProductConfig[] = [
    {
        id: 1,
        title: 'Home movers',
        description: 'We have well-trained reliable experts who offer a comprehensive moving full service to ensure minimal stress during your home move. We ensure that packing of documents is done and furniture is moved with great care.',
        route: ''
    },
    {
        id: 2,
        title: 'Home checklist',
        description: 'To successfully undertake professional Office Removals requires significant expertise and a detailed plan for action. Joel Transport are the experts when planning and executing office furniture removals...',
        route: ''
    },
    {
        id: 3,
        title: 'Checklist',
        description: 'We provide storage facilities for your personal and household effects. We offer short and long-term storage contracts. Loads are stored in Pallets within our warehouse. With storage in Gauteng...',
        route: ''
    }
]
