import { FC } from "react";
import { Button } from "react-bootstrap";
import { BsTruck } from "react-icons/bs";
import { TruckDetailsConfig } from "../../_configurations/truckDetails.config";

interface IProps {
    truckDetails: TruckDetailsConfig
}
const TruckDisplay: FC<IProps> = ({ truckDetails }) => {
    return <div className="col-12 truckDisplay">
        <div className="row">
            <div className="col-12 truckDisplay__head">
                <BsTruck />
            </div>
            <div className="col-12 truckDisplay__body">
                {truckDetails?.description.map(desc => <>
                    <div className="col-12 mb-3">
                        <div className="row">
                            <div className="col-6 truckDisplay__body__item truckDisplay__body__item--left ps-4">
                                <p>{Object.keys(desc)[0]}</p>
                            </div>
                            <div className="col-6 truckDisplay__body__item truckDisplay__body__item--right pe-4">
                                <p>{Object.values(desc)[0]}</p>
                            </div>
                        </div>
                    </div>
                </>)}
            </div>
            <div className="col-12 truckDisplay__head">
                <Button variant="secondary">Choose truck</Button>
            </div>
        </div>
    </div>
}

export default TruckDisplay;
