/* eslint-disable react/no-unescaped-entities */
import { Accordion } from "react-bootstrap";
import { homeMoversConfig } from "./benefits.config";
import { ResourcesPageSectionConfig } from "./rightsection.config";

export const pageSections: ResourcesPageSectionConfig = {
    "planToMove": {
        id: 1,
        title: "Do you plan to move your home locally?",
        description: <>
            <p>We have well-trained reliable experts who offer a comprehensive moving full service to ensure minimal stress during your home move. We ensure that packing of documents is done and furniture is moved with great care.
                <br /><br />
                Are there access restrictions for big trucks in your complex or estate?
                Do not worry, Joel Transport has got you, we got the right size truck just for you. For peace of mind, insurance of your goods is available through our brokers for the safety and protection of your goods.</p>
        </>,
        image: "/img/services/service_home_moves.png",
        secondaryButton: { title: "Call me back" },
        primaryButton: { title: "Get a quote" }
    },
    "hustleFreeMove": {
        id: 2,
        title: "Let’s make your move hustle free.",
        description: <>
            <div className="resources__product-description__summary__information-smalltext">
                <p>No matter what type of move you're making Joel Transport is here for you, <br />our services are tailored according to your needs.</p>
            </div>
            <Accordion defaultActiveKey={['0']}>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Discounted Services</Accordion.Header>
                    <Accordion.Body>
                        When you book a move with us using our online platfom you get our Truck & crew as a discounted services, including furniture covers
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Free online quote</Accordion.Header>
                    <Accordion.Body>
                        When you book a move with us using our online platfom you get our Truck & crew as a discounted services, including furniture covers
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Driver updates</Accordion.Header>
                    <Accordion.Body>
                        When you book a move with us using our online platfom you get our Truck & crew as a discounted services, including furniture covers
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>,
        image: "/img/services/service_home_moves.png"
    }
}

export const officeMoveSections: ResourcesPageSectionConfig = {
    "relocateLocally": {
        id: 1,
        title: "Do you plan to relocate your office locally?",
        description: <>
            <p>
                We are the experts when planning and executing office furniture removals. Our team leaders are well trained and well equipped to supervise an office removal process.
                <br /><br />
                To move an office requires furniture and locations labelling, dismantling, reassembling, packing, and unpacking of files, removals of safes, bulk fillers handling and the safe and secure removals of computer equipment.
                <br /><br />
                Through our highly trained team leaders we can co-ordinate these processes with ease. No matter what type of move you’re making Joel Transport is here for you, our services are tailored according to your needs.
            </p>
        </>,
        image: "/img/services/office_move.png",
        secondaryButton: { title: "Call me back" }
    },
    "benefits": {
        ...homeMoversConfig, title: "Benefits of relocating your office with us."
    },
    "internationally": {
        id: 3,
        title: "Do you plan to relocate your office Internationally?",
        description: <>
            <p>
                We offers the full range of international moving services, from packing, crating, shipping to customs clearance and storage. To ensure that your move is smooth and seamless, we assign you a personal move assistant to guide you through every step.
                <br /><br />
                The services and benefits we offer under international moves are: Lower Container Load Service is used where cargo is collected crated, consolidated, and dispatched in a 30-day period. This is a cost-effective solution for our clients with smaller volumes. Full Container Load Service are used for larger loads, either 6 or 12-meter containers are used. This is faster and the most efficient shipping method for larger loads. Air Freight Service is the most preferred method by most customers, it is fast and safe.
            </p>
        </>,
        image: "/img/services/office_move.png",
        secondaryButton: { title: "Call me back" }
    }
}

export const storageSections: ResourcesPageSectionConfig = {
    "storageLocally": {
        id: 1,
        title: "Looking for storage locally? Get an instant quote online.",
        description: <>
            <p>
                We provide storage facilities for your personal and household effects. We offer short and long-term storage contracts. Loads are stored in wooden crates within our warehouse.
                <br /><br />
                With storage in Gauteng* and partnered facilities in Kwazulu Natal, the Eastern and Western Cape, Joel Transport can offer its customers secure storage facilities to suit their specific requirements in those regions.
                <br /><br />
                *Get your free instant quote in Gauteng, for Kwazulu-Natal, or Cape Town please give
                us your contact information and a specialist will assist you.
            </p>
        </>,
        image: "/img/services/storage_service.png",
        secondaryButton: { title: "Call me back" },
        primaryButton: { title: "Get a quote" }
    },
    "benefits": {
        ...homeMoversConfig, title: "Benefits of having a storage for your items with us."
    },
    "internationally": {
        id: 1,
        title: "Looking for storage internationally?",
        description: <>
            <p>
                Through our international partners, we offer seamless services that we offer in South Africa. send us a call me back and one of the specialists will be in touch to help you find storage for your items.
                <br /><br />
                We provide the full range of international moving services, from packing, crating, and shipping to customs clearance and storage. To ensure that your storage is smooth and seamless, we assign you a personal storage assistant to guide you through every step.
            </p>
        </>,
        image: "/img/services/storage_int.png",
        secondaryButton: { title: "Call me back" }
    }
}

export const specializedServicesSections: ResourcesPageSectionConfig = {
    "pet": {
        id: 1,
        title: "Looking to relocate your pet?",
        description: <>
            <p>
                We provide domestic and international Pet Moving Services using our trusted pet removal teams working to the local and international regulations on the movement of pets.
                <br /><br />
                Get in-touch with our team.
            </p>
        </>,
        image: "/img/services/pet_service.png",
        secondaryButton: { title: "Call me back" }
    },
    "art": {
        id: 2,
        title: "Planning to relocate your art collection?",
        description: <>
            <p>
                We move Fine Art pieces domestically and internationally in safely packaged and secure packaging and/or crating to prevent damage. This service is backed up by our insurance service option.
                <br /><br />
                Get in-touch with our team.
            </p>
        </>,
        image: "/img/services/art_service.png",
        secondaryButton: { title: "Call me back" }
    },
    "vehicle": {
        id: 3,
        title: "Looking to transport your vehicle?",
        description: <>
            <p>
                We provide domestic and international Vehicle Moving services, for vehicles that can move using their own power. Moving of non-runner vehicles is significantly more costly, with limited-service options.
                <br /><br />
                Get in-touch with our team.
            </p>
        </>,
        image: "/img/services/vehicle_service.png",
        secondaryButton: { title: "Call me back" }
    },
    "danger": {
        id: 4,
        title: "Looking to move dangerous goods?",
        description: <>
            <p>
                Our Dangerous Goods moving service uses highly trained specialist teams. Dangerous goods we move include Paints, Chemicals, Flammable Gases, Flammable Liquids and Solids or Corrosives.
                <br /><br />
                Get in-touch with our team.
            </p>
        </>,
        image: "/img/services/danger_service.png",
        secondaryButton: { title: "Call me back" }
    }
}
