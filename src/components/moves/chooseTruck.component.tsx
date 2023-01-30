import { useState } from "react";
import { Carousel } from "react-bootstrap";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { truckDetailsConfig } from "../../_configurations/truckDetails.config";
import TruckDisplay from "./truckDisplay.component";

const ChooseTruck = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex: number, e: any) => {
        setIndex(selectedIndex);
    };

    return <div className="row">
        <div className="col-1 truckDisplay__indicators" onClick={() => !(index - 1 < 0) && setIndex(index - 1)}>
            <RxCaretLeft />
        </div>
        <div className="col-10">
            <Carousel
                activeIndex={index}
                onSelect={handleSelect}
                interval={null}
                indicators={false}
                controls={false}
            >
                {
                    truckDetailsConfig.map((x, i) => <>
                        <Carousel.Item key={i} className={i == index ? 'active' : undefined}>
                            <div className="row">
                                <div className="col-6">
                                    <TruckDisplay truckDetails={x[0]} />
                                </div>
                                <div className="col-6">
                                    <TruckDisplay truckDetails={x[1]} />
                                </div>
                            </div>
                        </Carousel.Item>
                    </>)
                }
            </Carousel>
            <div className="col-12 truckDisplay__truck-summary">
                <p>This vehicle is good for an average double bed, single door fridge, washing machine and a few other small things.</p>
            </div>
        </div>
        <div className="col-1 truckDisplay__indicators" onClick={() => (index + 1 < truckDetailsConfig.length) && setIndex(index + 1)}>
            <RxCaretRight />
        </div>
    </div>
}

export default ChooseTruck;
