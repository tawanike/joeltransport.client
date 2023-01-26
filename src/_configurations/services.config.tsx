import { ReactNode } from "react";
import { MdOutlineEmojiTransportation } from "react-icons/md";

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
        title: 'Service 1',
        description: 'This is a description',
        link: 'https://www.ibm.com',
        image: '',
        bgColor: 'light-blue',
        icon: <MdOutlineEmojiTransportation />
    },
    {
        id: '2',
        title: 'Service 2',
        description: 'This is a description',
        link: 'https://www.ibm.com',
        image: '',
        bgColor: 'orange',
        icon: <MdOutlineEmojiTransportation />
    },
    {
        id: '3',
        title: 'Service 3',
        description: 'This is a description',
        link: 'https://www.ibm.com',
        image: '',
        bgColor: 'brown',
        icon: <MdOutlineEmojiTransportation />
    },
    {
        id: '4',
        title: 'Service 2',
        description: 'This is a description',
        link: 'https://www.ibm.com',
        image: '',
        bgColor: 'orange',
        icon: <MdOutlineEmojiTransportation />
    },
    {
        id: '5',
        title: 'Service 3',
        description: 'This is a description',
        link: 'https://www.ibm.com',
        image: '',
        bgColor: 'light-blue',
        icon: <MdOutlineEmojiTransportation />
    },
    {
        id: '6',
        title: 'Service 3',
        description: 'This is a description',
        link: 'https://www.ibm.com',
        image: '',
        bgColor: 'orange',
        icon: <MdOutlineEmojiTransportation />
    }
]
