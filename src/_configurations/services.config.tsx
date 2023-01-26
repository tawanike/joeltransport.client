import { ReactNode } from "react";
import { MdOutlineEmojiTransportation } from "react-icons/md";
import { BiHomeSmile } from "react-icons/bi";
import { FaLaptopHouse, FaLocationArrow, FaPlaneDeparture, FaWarehouse } from "react-icons/fa";

export type ServiceConfig = {
    id: string,
    title: string,
    description: string,
    link: string,
    image: string,
    bgColor: string,
    icon: ReactNode
};

export const servicesConfig: ServiceConfig[] = [
    {
        id: '1',
        title: 'Domestic move',
        description: 'Planning to relocate your home around Gauteng? Schedule your move online.',
        link: '/move-services',
        image: '',
        bgColor: 'light-blue',
        icon: <BiHomeSmile />
    },
    {
        id: '2',
        title: 'Long distance move',
        description: 'Get in-touch with one of expects to help you plan your international move.',
        link: '/move-services',
        image: '',
        bgColor: 'orange',
        icon: <FaLocationArrow />
    },
    {
        id: '3',
        title: 'International move',
        description: 'Get in-touch with one of expects to help you with your move',
        link: '/move-services',
        image: '',
        bgColor: 'brown',
        icon: <FaPlaneDeparture />
    },
    {
        id: '4',
        title: 'Office relocation',
        description: 'Get in-touch with one of expects to help you plan your international move.',
        link: '/move-services',
        image: '',
        bgColor: 'orange',
        icon: <MdOutlineEmojiTransportation />
    },
    {
        id: '5',
        title: 'Specialized services',
        description: 'Planning to relocate your piano, art, pet? get in touch with one of our expects to help you with your move or relocation. ',
        link: '/move-services',
        image: '',
        bgColor: 'light-blue',
        icon: <FaLaptopHouse />
    },
    {
        id: '6',
        title: 'Storage services',
        description: 'Looking for a shot-term or long term storage? book and schedule your storage online.',
        link: '/storage',
        image: '',
        bgColor: 'orange',
        icon: <FaWarehouse />
    }
]
