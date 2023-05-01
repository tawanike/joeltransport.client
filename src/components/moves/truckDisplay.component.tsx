import { FC } from "react";
import { Button } from "react-bootstrap";
import { IProduct } from "src/_models/types";

interface IProps {
  truck: IProduct;
  onSelect: (product: IProduct) => void;
  isSelected: boolean;
  inView: boolean;
  isBooked: boolean;
}

const TruckDisplay: FC<IProps> = ({
  isBooked,
  truck,
  onSelect,
  isSelected,
  inView,
}) => {
  return (
    <div
      className={`col-12 truckDisplay truckDisplay${
        isSelected ? "--selected" : inView ? "--selected" : ""
      }`}
    >
      <div className="row">
        <div className="col-12 truckDisplay__head">
          <img src="/img/trucks/1.png" alt="" />
          <h6>Loads: {truck.subtitle}</h6>
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
                <p>
                  {truck.size}
                  {truck.unit}
                </p>
                <p>{truck.weight}</p>
                <p>{truck.load_capacity}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 truckDisplay__head">
          <Button
            variant="secondary"
            onClick={() => onSelect(truck)}
            disabled={!isBooked || isSelected}
          >
            {!isBooked ? `Booked out, change Date/Time` : `Choose truck`}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TruckDisplay;
