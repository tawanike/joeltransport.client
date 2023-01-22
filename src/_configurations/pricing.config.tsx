export type PricingConfig = {
    id: number,
    title: string,
    description: string,
    price: string,
    details: string[]
};

export const pricingConfig: PricingConfig[] = [
    {
        id: 1,
        title: 'Standard 1 bed move',
        description: "Please note: the prices only applies to moves around Gaunteng province",
        price: "R1,850.00",
        details: [
            "1 Bedroom, 1 Lounge, 1 Kitchen, 1 Bathroom",
            "Est. contents volume: 500 to 700 cubic feet",
            "Move within 60km radius of Centurion"
        ]
    },
    {
        id: 2,
        title: 'Standard 2 bed move',
        description: "Please note: the prices only applies to moves around Gaunteng province",
        price: "R2,400.00",
        details: [
            "2 bedrooms, 1 lounge, 1 kitchen, 2 bathrooms​",
            "1 extra room or single garage",
            "Est. volume: 800 to 1,500 cubic feet",
            "60km radius of Centurion"
        ]
    },
    {
        id: 3,
        title: 'Standard 3 bed move',
        description: "Please note: the prices only applies to moves around Gaunteng province",
        price: "R4,800.00",
        details: [
            "3 bedrooms, 1 lounge, 1 kitchen, 2.5 bath​​",
            "1 Extra Room & Double Garage​",
            "Est. volume: 1,600 to 2000 cubic feet",
            "60km radius of Centurion"
        ]
    },
]
