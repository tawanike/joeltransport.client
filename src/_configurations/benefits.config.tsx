import { ReactNode } from "react";
import { BsTruck } from "react-icons/bs";
import { BlueSectionConfig } from "./blueSection.config";

export type BlueSectionListItemConfig = {
  id: number;
  title: string;
  description: ReactNode;
  icon: ReactNode;
};

export const homeMoversBenefitsConfig: BlueSectionListItemConfig[] = [
  {
    id: 1,
    title: "Truck and crew",
    description: (
      <>
        <p>
          Whenever you book a moving truck, <br />
          it comes with a skilled crew.
        </p>
      </>
    ),
    icon: <BsTruck />,
  },
  {
    id: 2,
    title: "Trained staff",
    description: (
      <>
        <p>
          Your items are in the safe hands of
          <br /> our well-trained and experienced staff.
        </p>
      </>
    ),
    icon: <BsTruck />,
  },
  {
    id: 3,
    title: "Moving insurance",
    description: (
      <>
        <p>
          You can protect your items using <br /> our competitive offers.
        </p>
      </>
    ),
    icon: <BsTruck />,
  },
  {
    id: 4,
    title: "Storage insurance",
    description: (
      <>
        <p>
          We care for your items by storing <br /> them in a secure space.
        </p>
      </>
    ),
    icon: <BsTruck />,
  },
];

export const homeMoversConfig: BlueSectionConfig = {
  id: 1,
  title: "Choosing us has its perks",
  description: (
    <>
      <p>
        We have well-trained, reliable experts who offer full service packages
        to ensure minimal work interruption during your office move. We make
        sure that that packing of all documents is done as labelled, and that
        furniture is moved with great care.
      </p>
    </>
  ),
  listItems: homeMoversBenefitsConfig,
};
