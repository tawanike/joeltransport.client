/* eslint-disable react/no-unescaped-entities */
import { Accordion } from "react-bootstrap";
import { homeMoversConfig } from "./benefits.config";

export const pageSections: any = {
  planToMove: {
    id: 1,
    title: "Do you plan to move your home locally?",
    description: (
      <>
        <p>
          We have well-trained, reliable experts who offer a comprehensive
          moving service. Documents and furniture are packed and moved with
          great care.
          <br />
          <br />
          Are there access restrictions concerning big trucks in your or estate?
          Don’t worry, Joël Transport has the right size for your needs! For
          peace of mind, insurance is available through our brokers.
        </p>
      </>
    ),
    image: "/img/trucks/front-truck.png",
    secondaryButton: { title: "Call me back" },
    primaryButton: { title: "Get a quote" },
  },
  hustleFreeMove: {
    id: 2,
    title: "Let’s make your move hustle free.",
    description: (
      <>
        <div className="resources__product-description__summary__information-smalltext">
          <p>
            No matter what type of move you’re making, Joël Transport is here
            for you, our services are tailored according to your needs.
          </p>
        </div>
        <Accordion defaultActiveKey={["0"]}>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Discounted services</Accordion.Header>
            <Accordion.Body>
              When you book your move using our website, you get the truck and
              crew as discounted additional services! We also include furniture
              covers.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Free online quote</Accordion.Header>
            <Accordion.Body>
              Plan ahead for your expenses by getting a quote through this
              website. Fill all the details correctly to get an accurate amount.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Driver updates</Accordion.Header>
            <Accordion.Body>
              Joël Transport sends regular updates on the day of the move. We
              want to make sure that you are always in the loop!
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </>
    ),
    image: "/img/trucks/long-truck.png",
  },
};

export const officeMoveSections: any = {
  relocateLocally: {
    id: 1,
    title: "Do you plan to relocate your office locally?",
    description: (
      <>
        <p>
          We have years of experience in planning and executing office furniture
          removals! Our team leaders are trained and equipped to supervise these
          processes.
          <br />
          <br />
          Moving an office requires furniture and locations labelling,
          dismantling, reassembling, packing and unpacking of files, removals of
          safes, bulk fillers handling and safe and secure removal of computer
          equipment.
          <br />
          <br />
          Through our highly trained team leaders we can coordinate these
          processes with ease. No matter what type of move you’re making, Joël
          Transport is here for you! Our services are customised to your needs.
          When it comes to the safety and protection of your goods – we make
          sure all the necessary steps have been fulfilled.
        </p>
      </>
    ),
    image: "/img/trucks/long-truck.png",
    secondaryButton: { title: "Call me back" },
  },
  benefits: {
    ...homeMoversConfig,
    title: "Choosing us has its perks",
  },
  internationally: {
    id: 3,
    title: "Planning to move your office internationally?",
    description: (
      <>
        <p>
          We offer a full-range international moving service. From packing,
          crating, and shipping; to customs clearance and even storage.
        </p>
        <p>The services we offer under “International Moves” are as follows:</p>
        <ul style={{ listStyle: "none" }}>
          <li>
            - Lower Container Load Service: cargo is collected, crated,
            consolidated, and dispatched within a 30-day period.
          </li>
          <li>
            - Full Container Load Service: for larger loads of either 6 or 12
            cubic metres.
          </li>
          <li>
            - Air Freight Service: most commonly used method for everyday needs.
          </li>
        </ul>
      </>
    ),
    image: "/img/international.png",
    secondaryButton: { title: "Call me back" },
  },
};

export const storageSections: any = {
  storageLocally: {
    id: 1,
    title: "Looking for storage locally? Get an instant quote online.",
    description: (
      <>
        <p>
          We provide storage facilities for your personal and household
          belongings. We offer short and long-term contracts. Loads are stored
          in wooden crates within our warehouse.
          <br />
          <br />
          With storage in Gauteng* and partnered facilities in KwaZulu-Natal,
          the Eastern and Western Cape; Joël Transport can offer its customers
          secure storage facilities to suit their specific requirements in those
          regions.
          <br />
          <br />
          *Get an instant quote for Gauteng! For KwaZulu-Natal or Cape Town,
          please give us your contact information and a specialist will assist
          you.
        </p>
      </>
    ),
    image: "/img/services/storage_service.png",
    secondaryButton: { title: "Call me back" },
    primaryButton: { title: "Get a quote" },
  },
  benefits: {
    ...homeMoversConfig,
    title: "Choosing us has its perks",
  },
  internationally: {
    id: 1,
    title: "Looking for storage internationally?",
    description: (
      <>
        <p>
          Through our international partners, we offer the same services as
          those we do in South Africa.
          <br />
          <br />
          We provide the full range of international moving services; from
          packing, crating, and shipping, to customs clearance and storage. To
          ensure that your storage is smooth and seamless, we assign you a
          personal storage assistant to guide you through every step.
        </p>
      </>
    ),
    image: "/img/services/international.png",
    secondaryButton: { title: "Call me back" },
  },
};

export const specializedServicesSections: any = {
  pet: {
    id: 1,
    title: "Looking to relocate your pet?",
    description: (
      <>
        <p>
          We provide domestic and international pet moving services using our
          trusted pet removal teams working to the local and international
          regulations on the movement of pets.
          <br />
          <br />
          Get in-touch with our team.
        </p>
      </>
    ),
    image: "/img/services/pet_service.png",
    secondaryButton: { title: "Call me back" },
  },
  art: {
    id: 2,
    title: "Planning to relocate your art collection?",
    description: (
      <>
        <p>
          We move fine art pieces domestically and internationally in safely
          packaged and secure packaging and/or crating to prevent damage. This
          service is backed up by our insurance service option.
          <br />
          <br />
        </p>
      </>
    ),
    image: "/img/services/art_service.png",
    secondaryButton: { title: "Call me back" },
  },
  vehicle: {
    id: 3,
    title: "Looking to transport your vehicle?",
    description: (
      <>
        <p>
          We provide domestic and international vehicle moving services for
          vehicles that can move using their own power. Transportation of
          non-runner vehicles is significantly costlier, with limited-service
          options.
          <br />
          <br />
        </p>
      </>
    ),
    image: "/img/services/vehicle-transportation.png",
    secondaryButton: { title: "Call me back" },
  },
  danger: {
    id: 4,
    title: "Looking to move dangerous goods?",
    description: (
      <>
        <p>
          Our Dangerous Goods service uses highly trained specialist teams.
          Dangerous goods we move include paints, chemicals, flammable gases,
          flammable liquids and solids, or corrosives.
          <br />
          <br />
          Get in-touch with our team.
        </p>
      </>
    ),
    image: "/img/services/dangerous-goods.png",
    secondaryButton: { title: "Call me back" },
  },
};

export const internationalMovesConfig = {
  id: 100,
  title: "Planning to move your home internationally?",
  description: (
    <>
      <p>
        We offer a full-range international moving service. From packing,
        crating, and shipping to customs clearance and storage. The services we
        offer under “International Moves” are as follows:
      </p>
      <ul>
        <li>
          Lower Container Load Service: cargo is collected, crated,
          consolidated, and dispatched within a 30-day period.
        </li>
        <li>
          Full Container Load Service: for larger loads of either 6 or 12 cubic
          metres.
        </li>
        <li>Air Freight Service: commonly used method for everyday needs.</li>
      </ul>
    </>
  ),
  image: "/img/services/international.png",
  secondaryButton: { title: "Call me back" },
  benefits: {
    ...homeMoversConfig,
    title: "Choosing us has its perks",
  },
};

export const domesticMovesConfig = {
  id: 101,
  title: "Do you plan a long-distance move?",
  description: (
    <>
      <p>
        Our long-distance moves cover all cities and towns in South Africa, for
        moves that originate or end outside South Africa’s Gauteng province.
      </p>
      <p>
        We make long distance moving easy and enjoyable. We do almost everything
        for you! From packing, packaging material, removal, storage, and full
        value risk insurance, according to your needs.
      </p>
    </>
  ),
  image: "/img/trucks/long-truck.png",
  secondaryButton: { title: "Call me back" },
  benefits: {
    ...homeMoversConfig,
    title: "Choosing us has its perks",
  },
};
