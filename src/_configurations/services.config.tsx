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
  breadcrumb: string;
  slug: string;
};

export const servicesConfig: ServiceConfig[] = [
  {
    id: "1",
    title: "Domestic move",
    description:
      "Planning to move in South Africa, within the Gauteng province? Book and pay for your move online.",
    link: "/services/home-moves",
    image: "",
    bgColor: "light-blue",
    icon: <BiHomeSmile />,
    btnText: "Get started",
    slug: "home-moves",
    breadcrumb: "Home moves",
  },
  {
    id: "2",
    title: "Long distance move",
    description:
      "Planning to move within South Africa, but outside Gauteng province? Get in touch with us for a speedy quote.",
    link: "/services/long-distance-move",
    image: "",
    bgColor: "orange",
    icon: <FaLocationArrow />,
    btnText: "Get started",
    slug: "long-distance-move",
    breadcrumb: "Long distance move",
  },
  {
    id: "3",
    title: "International move",
    description:
      "Planning to move internationally to, or from South Africa? Get in touch with us for a speedy quote. ",
    link: "/services/international-move",
    image: "",
    bgColor: "brown",
    icon: <FaPlaneDeparture />,
    btnText: "Get started",
    slug: "international-move",
    breadcrumb: "International move",
  },
  {
    id: "4",
    title: "Office relocation",
    description:
      "We have years of experience in planning and executing office furniture removals! Get in touch with us for a speedy quote.",
    link: "/services/office-relocation",
    image: "",
    bgColor: "orange",
    icon: <MdOutlineEmojiTransportation />,
    btnText: "Get started",
    slug: "office-relocation",
    breadcrumb: "Office relocation",
  },
  {
    id: "5",
    title: "Specialised services",
    description:
      "We provide hands-on and personal care to our customer’s valuable and delicate belongings, such as piano’s, art and or pets. ",
    link: "/services/specialized-services",
    image: "",
    bgColor: "light-blue",
    icon: <FaLaptopHouse />,
    btnText: "Get started",
    slug: "specialized-services",
    breadcrumb: "Specialised services",
  },
  {
    id: "6",
    title: "Storage services",
    description:
      "Looking for short-term or long-term storage facilities in South Africa? Book your storage online or get a quote!",
    link: "/services/storage",
    image: "",
    bgColor: "orange",
    icon: <FaWarehouse />,
    btnText: "Get started",
    slug: "storage",
    breadcrumb: "Storage services",
  },
];
