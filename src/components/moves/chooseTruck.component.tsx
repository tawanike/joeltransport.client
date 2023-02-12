
import { useContext, useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { useAPI } from 'src/_hooks';
import { selectTruck } from "src/_actions/trucks.actions";
import CostSummaryStateContext from "../../_contexts/costSummary.context";
import { IProduct } from "src/_models/types";
import TruckDisplay from "./truckDisplay.component";


const ChooseTruck = ({ isHoliday }: any) => {
    const api = useAPI();
    const { CostSummaryState, dispatchCostSummary } = useContext(CostSummaryStateContext);
    const [trucks, setTrucks] = useState<IProduct[]>([]);
    const [selectedTruck, setSelectedTruck] = useState<IProduct>();
    const [activeTruck, setActiveTruck] = useState<IProduct>();
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex: number, e: any) => {
        setIndex(selectedIndex);
        setActiveTruck(trucks[selectedIndex]);
    };

    useEffect(() => {
        (async () => {
            const trucks = await api.get("/products?category=2", false);
            setTrucks(trucks.results);
        })();
    }, []);

    useEffect(() => {

        if (selectedTruck) {

            let price = 0, offPeakDiscount: number = 0;
            if (!isHoliday) {
                price = selectedTruck.price + selectedTruck.off_peak_discount;
                offPeakDiscount = 0
            } else {
                price = selectedTruck.price;
                offPeakDiscount = selectedTruck.off_peak_discount;
            }

            dispatchCostSummary(selectTruck({
                quantity: 1,
                price: price,
                offPeakDiscount: offPeakDiscount,
            }));
        }

        // TODO: Save to database
    }, [selectedTruck]);


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
                    trucks.map((truck: IProduct, i) => <>
                        <Carousel.Item key={truck.id} className={i == index ? 'active' : undefined}>
                            <div className="row">
                                <div className="col-6">
                                    <TruckDisplay truck={truck} onSelect={setSelectedTruck} />
                                </div>
                                <div className="col-6">
                                    <TruckDisplay truck={truck} onSelect={setSelectedTruck} />
                                </div>
                            </div>
                        </Carousel.Item>
                    </>)
                }
            </Carousel>
            <div className="col-12 truckDisplay__truck-summary">
                <p>{activeTruck && activeTruck.description}</p>
            </div>
        </div>
        <div className="col-1 truckDisplay__indicators" onClick={() => (index + 1 < trucks.length) && setIndex(index + 1)}>
            <RxCaretRight />
        </div>
    </div>
}

export default ChooseTruck;
