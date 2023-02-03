export type TruckDetailsConfig = {
    id: number,
    description: { [key: string]: string }[],
    summary: string
};

export const truckDetailsConfig: TruckDetailsConfig[][] = [
    [
        {
            id: 0,
            description: [
                { "Truck size": "1 Ton Bakkie" },
                { "Max weight": "(kg) 1000" },
                { "Load capacity": "(m) 2.20 x1.45" }
            ],
            summary: "This vehicle is good for an average double bed, single door fridge, washing machine and a few other small things."
        }, {
            id: 1,
            description: [
                { "Truck size": "1/2 Ton bakkie" },
                { "Max weight": "(kg) m1300" },
                { "Load capacity": "(m) 2.78 x 1.63" }
            ],
            summary: "There is enough space in this vehicle to fit an average double bed, two-seater couch, washing machine, double-door refrigerator, and a few other items."
        }
    ],
    [
        {
            id: 2,
            description: [
                { "Truck size": "3 Ton Truck" },
                { "Max weight": "(kg) 3000" },
                { "Load capacity": "(m) 4.30 x 1.80" }
            ],
            summary: "The vehicle is suitable for an average 2 bedroom, lounge, dining room, washing machine, double door fridge, and other small items (closed body truck, subject to availability)"
        },
        {
            id: 3,
            description: [
                { "Truck size": "8 Ton truck" },
                { "Max weight": "(kg) 6800" },
                { "Load capacity": "(m) 7.20 x2.40" }
            ],
            summary: "The vehicle can accommodate the contents of most two- or three-bedroom homes. (closed body truck, subject to availability."
        }
    ]
]
