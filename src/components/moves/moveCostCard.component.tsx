import { useContext, useEffect } from "react";
import { BsInfoCircle } from "react-icons/bs";
import MoveStateContext from "../../_contexts/move.context";
import { CostSummary } from "../../_models/types";

const MoveCostCard = () => {
    const { MoveState, dispatchMove } = useContext(MoveStateContext);

    useEffect(() => {
        console.log("Inside cost card", MoveState);
    }, [MoveState])

    const getSubTotal = () => {
        console.log(Object.keys(MoveState))
        return (Object.keys(MoveState) as Array<keyof CostSummary>)
            .map((expense) => {
                if (MoveState && MoveState[expense]) {
                    return (MoveState[expense]?.quantity || 0) * (MoveState[expense]?.price || 0);
                }
                return 0
            })
            .reduce((sum, exp) => sum + exp, 0) ;
    }

    return <>
        <div className="col-12 move-cost-card">
            <div className="row">
                <div className="col-12 move-cost-card__head">
                    <p>Quote summary</p>
                </div>
                <div className="col-12 move-cost-card__section">
                    <div className="row">
                        <div className="col-12 move-cost-card__section__head">
                            <p>Moving charge</p>
                        </div>
                        <div className="col-12 move-cost-card__section__details">
                            <ul>
                                <li>
                                    <div className="row">
                                        <div className="col-6 move-cost-card__section__details__title">
                                            <p>Truck & crew</p>
                                        </div>
                                        <div className="col-1 move-cost-card__section__details__title">
                                            <BsInfoCircle />
                                        </div>
                                        <div className="col-5 move-cost-card__section__details__title move-cost-card__section__details__title--cost">
                                            <p>R{ MoveState.truck ? MoveState.truck.price : '0.00' }</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="row">
                                        <div className="col-6 move-cost-card__section__details__title">
                                            <p>Off pick discount</p>
                                        </div>
                                        <div className="col-1 move-cost-card__section__details__title">
                                            <BsInfoCircle />
                                        </div>
                                        <div className="col-5 move-cost-card__section__details__title move-cost-card__section__details__title--cost">
                                            <p>R{ MoveState.truck && MoveState.truck.offPeakDiscount ? MoveState.truck.offPeakDiscount : '0.00'  }</p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-12 move-cost-card__section">
                    <div className="row">
                        <div className="col-12 move-cost-card__section__head">
                            <p>Added services</p>
                        </div>
                        <div className="col-12 move-cost-card__section__details">
                            <ul>
                                <li>
                                    <div className="row">
                                        <div className="col-6 move-cost-card__section__details__title">
                                            <p>Bakkie shuttle</p>
                                        </div>
                                        <div className="col-1 move-cost-card__section__details__title">
                                            <BsInfoCircle />
                                        </div>
                                        <div className="col-5 move-cost-card__section__details__title move-cost-card__section__details__title--cost">
                                            <p>R{ MoveState.bakkieShuttle ? MoveState.bakkieShuttle.price * MoveState.bakkieShuttle.quantity : '0.00'  }</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="row">
                                        <div className="col-6 move-cost-card__section__details__title">
                                            <p>Bubble wrap</p>
                                        </div>
                                        <div className="col-1 move-cost-card__section__details__title">
                                            <BsInfoCircle />
                                        </div>
                                        <div className="col-5 move-cost-card__section__details__title move-cost-card__section__details__title--cost">
                                            <p>R{
                                                MoveState.bubbleWrap ?
                                                    MoveState.bubbleWrap.price * MoveState.bubbleWrap.quantity :
                                                    0.00
                                            }</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="row">
                                        <div className="col-6 move-cost-card__section__details__title">
                                            <p>Large boxes</p>
                                        </div>
                                        <div className="col-1 move-cost-card__section__details__title">

                                        </div>
                                        <div className="col-5 move-cost-card__section__details__title move-cost-card__section__details__title--cost">
                                            <p>R{
                                                MoveState.largeBox ?
                                                    MoveState.largeBox.price * MoveState.largeBox.quantity :
                                                    0.00
                                            }</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="row">
                                        <div className="col-6 move-cost-card__section__details__title">
                                            <p>Medium boxes</p>
                                        </div>
                                        <div className="col-1 move-cost-card__section__details__title">

                                        </div>
                                        <div className="col-5 move-cost-card__section__details__title move-cost-card__section__details__title--cost">
                                            <p>R{
                                                MoveState.mediumBox ?
                                                    MoveState.mediumBox.price * MoveState.mediumBox.quantity :
                                                    0.00
                                            }</p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="col-12 move-cost-card__section move-cost-card__section--total mt-5">
                    <div className="row">
                        <div className="col-12 move-cost-card__section__details">
                            <ul>
                                <li className="mt-3">
                                    <div className="row">
                                        <div className="col-6 move-cost-card__section__details__title">
                                            <p>Sub total</p>
                                        </div>
                                        <div className="col-6 move-cost-card__section__details__title move-cost-card__section__details__title--cost">
                                            <p>R{getSubTotal()}</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="mt-4">
                                    <div className="row">
                                        <div className="col-6 move-cost-card__section__details__title">
                                            <p>VAT (15%)</p>
                                        </div>
                                        <div className="col-6 move-cost-card__section__details__title move-cost-card__section__details__title--cost">
                                            <p>R{getSubTotal() * .15}</p>
                                        </div>
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>


            </div>
        </div>
        <div className="col-12 move-cost-card__section move-cost-card__section--payable">

            <div className="col-12 move-cost-card__section__details">
                <ul>
                    <li className="">
                        <div className="row">
                            <div className="col-6 move-cost-card__section__details__title">
                                <p>Total</p>
                            </div>
                            <div className="col-6 move-cost-card__section__details__title move-cost-card__section__details__title--cost">
                                <p>R{(getSubTotal() * .15) + getSubTotal()}</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </>
}

export default MoveCostCard;
