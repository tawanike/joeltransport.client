import { FC } from "react";
import { Button } from "react-bootstrap";
import { BsTruck } from "react-icons/bs";
import { IProduct } from "src/_models/types";

interface IProps {
    truck: IProduct;
    onSelect: (product: IProduct) => void;
}

const TruckDisplay: FC<IProps> = ({ truck, onSelect }) => {
    return <div className="col-12 truckDisplay">
    <div className="row">
        <div className="col-12 truckDisplay__head">
            <BsTruck />
        </div>
        <div className="col-12 truckDisplay__body">
                <div className="col-12 mb-3">
                    <div className="row">
                        <div className="col-6 truckDisplay__body__item truckDisplay__body__item--left ps-4">
                            <p>Truck size</p>
                            <p>Max weight</p>
                            <p>Load capacity</p>
                        </div>
                        <div className="col-6 truckDisplay__body__item truckDisplay__body__item--right pe-4">
                            <p>{ truck.size }{ truck.unit }</p>
                            <p>{ truck.weight}</p>
                            <p>{ truck.load_capacity }</p>
                        </div>
                    </div>
                </div>
        </div>
        <div className="col-12 truckDisplay__head">
            <Button variant="secondary" onClick={ () => onSelect(truck) }>Choose truck</Button>
        </div>
    </div>
</div>
}

export default TruckDisplay;
