import { ReactNode } from "react";
import { BiHomeSmile } from "react-icons/bi";
import {
    FaLaptopHouse,
    FaLocationArrow,
    FaPlaneDeparture,
    FaWarehouse,
} from "react-icons/fa";
import { MdOutlineEmojiTransportation } from "react-icons/md";

export type ServiceConfig = {
    id: string;
    title: string;
    description: string;
    link: string;
    image: string;
    bgColor: string;
    icon: ReactNode;
    btnText: string;
};

export const servicesConfig: ServiceConfig[] = [
    {
        id: "1",
        title: "Domestic move",
        description:
            "Planning to relocate? Schedule the process online.",
        link: "/services/home-moves",
        image: "",
        bgColor: "light-blue",
        icon: <BiHomeSmile />,
        btnText: "Get moving"
    },
    {
        id: "2",
        title: "Long distance move",
        description:
            "More distance, less stress. So good that it’s true!",
        link: "/services/home-moves",
        image: "",
        bgColor: "orange",
        icon: <FaLocationArrow />,
        btnText: "Get started"
    },
    {
        id: "3",
        title: "International move",
        description: "Long distance doesn’t intimidate us.",
        link: "/services/home-moves",
        image: "",
        bgColor: "brown",
        icon: <FaPlaneDeparture />,
        btnText: "Get started"
    },
    {
        id: "4",
        title: "Office relocation",
        description:
            "Our experts take the headache out of international moves.",
        link: "/services/office-removals",
        image: "",
        bgColor: "orange",
        icon: <MdOutlineEmojiTransportation />,
        btnText: "Get started"
    },
    {
        id: "5",
        title: "Specialized services",
        description:
            "We’re in tune with your piano’s needs, know exactly how delicate moving art is, and can bet that your pet will be safe.",
        link: "/services/specialized-services",
        image: "",
        bgColor: "light-blue",
        icon: <FaLaptopHouse />,
        btnText: "Get started"
    },
    {
        id: "6",
        title: "Storage services",
        description:
            "Looking for short-term or long-term storage facilities? Book your unit with us!",
        link: "/services/storage",
        image: "",
        bgColor: "orange",
        icon: <FaWarehouse />,
        btnText: "Get started"
    },
];
