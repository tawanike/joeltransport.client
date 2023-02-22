import { ReactNode } from "react";
import { BsTruck } from "react-icons/bs";
import { BlueSectionConfig } from "./blueSection.config";

export type BlueSectionListItemConfig = {
    id: number,
    title: string,
    description: ReactNode,
    icon: ReactNode
};

export const homeMoversBenefitsConfig: BlueSectionListItemConfig[] = [
    {
        id: 1,
        title: 'Truck & crew',
        description: <><p>
            Whenever you book a moving truck, <br />it comes with the skilled crew.
        </p></>,
        icon: <BsTruck />
    },
    {
        id: 2,
        title: 'Trained stuff',
        description: <><p>
            Your items are in safe hands with<br /> our well-trained and experienced staff
        </p></>,
        icon: <BsTruck />
    },
    {
        id: 3,
        title: 'Move insurance',
        description: <><p>
            Ensure your items are protected with <br /> our competitive move insurance offers
        </p></>,
        icon: <BsTruck />
    },
    {
        id: 4,
        title: 'Storage insurance',
        description: <><p>
            Your items will be stored securely <br /> with us, so you can rest assured.
        </p></>,
        icon: <BsTruck />
    }
]

export const homeMoversConfig: BlueSectionConfig = {
    id: 1,
    title: "Here are some of the benefits of moving with us",
    description: <>
        <p>We have well-trained reliable experts who offers full service to ensure minimal work interruption during your home move.
            We ensure that packing of all documents is done as labelled and furniture is moved with great care.</p>
    </>,
    listItems: homeMoversBenefitsConfig
}
