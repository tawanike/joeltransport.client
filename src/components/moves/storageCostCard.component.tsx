/* eslint-disable react/no-unescaped-entities */
import { useContext, useRef, useState } from "react";
import { Overlay, Tooltip } from "react-bootstrap";
import { BsInfoCircle } from "react-icons/bs";
import { BookingContext } from "src/_contexts/booking.context";
import { Calculations } from "src/_helpers/calculations";
import CostSummaryStateContext from "../../_contexts/costSummary.context";

const StorageCostCard = () => {
    const { CostSummaryState, dispatchCostSummary } = useContext(
        CostSummaryStateContext
    );
    const bookingContext = useContext(BookingContext);
    const [show, setShow] = useState(false);
    const [showDiscountTooltip, setShowDiscountTooltip] = useState(false);
    const [showBukkieShuttleTooltip, setShowBukkieShuttleTooltip] =
        useState(false);

    const target = useRef(null);
    const discountTooltipTarget = useRef(null);
    const bukkieShuttleTooltipTarget = useRef(null);

    return (
        <>
            <div className="col-12 storage-cost-card">
                <div className="row">
                    <div className="col-12 storage-cost-card__head">
                        <div className="row">
                            <div className="col-4 storage-cost-card__head--start">
                                <p>Quote summary</p>
                            </div>
                            <div className="col-4 storage-cost-card__head--center csTablecenter">
                                <p>First month's charges</p>
                            </div>
                            <div className="col-4 storage-cost-card__head--end">
                                <p>Monthly charges</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 move-cost-card__section">
                        {CostSummaryState.storage &&
                            CostSummaryState.storage.quantity > 0 && (
                                <div className="row">
                                    <div className="col-12 move-cost-card__section__head">
                                        <p>Storage charge</p>
                                    </div>
                                    <div className="col-12 move-cost-card__section__details">
                                        <ul className="ps-0">
                                            <li>
                                                <div className="row pl-4">
                                                    <div className="col-4 move-cost-card__section__details__title">
                                                        <p>Storage units</p>
                                                    </div>

                                                    <div className="col-4 move-cost-card__section__details__title center csTablecenter move-cost-card__section__details__title--cost">
                                                        <p>
                                                            R{" "}
                                                            {CostSummaryState.storage
                                                                ? (
                                                                    CostSummaryState.storage.quantity *
                                                                    CostSummaryState.storage.price
                                                                ).toFixed(2)
                                                                : "0.00"}
                                                        </p>
                                                    </div>
                                                    <div className="col-4 move-cost-card__section__details__title move-cost-card__section__details__title--cost">
                                                        <p>
                                                            R
                                                            {CostSummaryState.storage
                                                                ? (
                                                                    CostSummaryState.storage.quantity *
                                                                    CostSummaryState.storage.price
                                                                ).toFixed(2)
                                                                : "0.00"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            )}
                    </div>
                    {bookingContext.state.formValues.collection && (
                        <div className="col-12 move-cost-card__section">
                            <div className="row">
                                <div className="col-12 move-cost-card__section__head">
                                    <p>Moving charge</p>
                                </div>
                                <div className="col-12 move-cost-card__section__details">
                                    <ul>
                                        {CostSummaryState.truck && (
                                            <li>
                                                <div className="row">
                                                    <div className="col-4 move-cost-card__section__details__title">
                                                        <p>Truck & Crew</p>
                                                    </div>
                                                    <div
                                                        className="col-1 move-cost-card__section__details__title csTablecenter"
                                                        ref={target}
                                                    >
                                                        <BsInfoCircle
                                                            onClick={() => {
                                                                setShow(!show);
                                                                setShowDiscountTooltip(false);
                                                                setShowBukkieShuttleTooltip(false);
                                                            }}
                                                        />
                                                        <Overlay
                                                            target={target.current}
                                                            show={show}
                                                            placement="right"
                                                        >
                                                            {(props) => (
                                                                <Tooltip id="truck-crew" {...props}>
                                                                    Truck and Crew means...
                                                                </Tooltip>
                                                            )}
                                                        </Overlay>
                                                    </div>
                                                    <div className="col-3 move-cost-card__section__details__title center move-cost-card__section__details__title--cost">
                                                        <p>
                                                            R
                                                            {CostSummaryState.truck
                                                                ? CostSummaryState.truck.price.toFixed(2)
                                                                : "0.00"}
                                                        </p>
                                                    </div>
                                                    <div className="col-4 move-cost-card__section__details__title move-cost-card__section__details__title--cost">
                                                        <p> R0.00</p>
                                                    </div>
                                                </div>
                                            </li>
                                        )}
                                        {CostSummaryState.truck &&
                                            CostSummaryState.truck.off_peak_discount > 0 && (
                                                <li>
                                                    <div className="row">
                                                        <div className="col-4 move-cost-card__section__details__title">
                                                            <p>Off peak discount</p>
                                                        </div>
                                                        <div
                                                            className="col-1 move-cost-card__section__details__title csTablecenter"
                                                            ref={discountTooltipTarget}
                                                        >
                                                            <BsInfoCircle
                                                                onClick={() => {
                                                                    setShowDiscountTooltip(!showDiscountTooltip);
                                                                    setShow(false);
                                                                    setShowBukkieShuttleTooltip(false);
                                                                }}
                                                            />
                                                            <Overlay
                                                                target={discountTooltipTarget.current}
                                                                show={showDiscountTooltip}
                                                                placement="right"
                                                            >
                                                                {(props) => (
                                                                    <Tooltip id="off-peak-discount" {...props}>
                                                                        My Tooltip
                                                                    </Tooltip>
                                                                )}
                                                            </Overlay>
                                                        </div>
                                                        <div className="col-3 move-cost-card__section__details__title csTablecenter center move-cost-card__section__details__title--cost">
                                                            <p>
                                                                R
                                                                {CostSummaryState.truck
                                                                    ? CostSummaryState.truck.off_peak_discount.toFixed(
                                                                        2
                                                                    )
                                                                    : "0.00"}
                                                            </p>
                                                        </div>
                                                        <div className="col-4 move-cost-card__section__details__title move-cost-card__section__details__title--cost">
                                                            <p> R0.00</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            )}
                                        {CostSummaryState.bakkieShuttle && (
                                            <li>
                                                <div className="row">
                                                    <div className="col-4 move-cost-card__section__details__title">
                                                        <p>Bakkie shuttle</p>
                                                    </div>
                                                    <div
                                                        className="col-1 move-cost-card__section__details__title csTablecenter"
                                                        ref={bukkieShuttleTooltipTarget}
                                                    >
                                                        <BsInfoCircle
                                                            onClick={() => {
                                                                setShowBukkieShuttleTooltip(
                                                                    !showBukkieShuttleTooltip
                                                                );
                                                                setShow(false);
                                                                setShowDiscountTooltip(false);
                                                            }}
                                                        />
                                                        <Overlay
                                                            target={bukkieShuttleTooltipTarget.current}
                                                            show={showBukkieShuttleTooltip}
                                                            placement="right"
                                                        >
                                                            {(props) => (
                                                                <Tooltip id="bukkie-shuttle" {...props}>
                                                                    My Tooltip
                                                                </Tooltip>
                                                            )}
                                                        </Overlay>
                                                    </div>
                                                    <div className="col-3 move-cost-card__section__details__title center move-cost-card__section__details__title--cost">
                                                        <p>
                                                            R
                                                            {CostSummaryState.bakkieShuttle
                                                                ? (
                                                                    CostSummaryState.bakkieShuttle.price *
                                                                    CostSummaryState.bakkieShuttle.quantity
                                                                ).toFixed(2)
                                                                : "0.00"}
                                                        </p>
                                                    </div>
                                                    <div className="col-4 move-cost-card__section__details__title move-cost-card__section__details__title--cost">
                                                        <p> R0.00</p>
                                                    </div>
                                                </div>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="col-12 move-cost-card__section move-cost-card__section--total mt-5">
                        <div className="row">
                            <div className="col-12 move-cost-card__section__details">
                                <ul>
                                    <li className="mt-3">
                                        <div className="row">
                                            <div className="col-4 move-cost-card__section__details__title">
                                                <p>Sub total</p>
                                            </div>
                                            <div className="col-4 csTablecenter move-cost-card__section__details__title center">
                                                <p>
                                                    R
                                                    {Calculations.getSubTotal(CostSummaryState).toFixed(
                                                        2
                                                    )}
                                                </p>
                                            </div>
                                            <div className="col-4 move-cost-card__section__details__title move-cost-card__section__details__title--cost">
                                                <p>
                                                    R
                                                    {CostSummaryState.storage
                                                        ? (
                                                            CostSummaryState.storage.quantity *
                                                            CostSummaryState.storage.price
                                                        ).toFixed(2)
                                                        : "0.00"}
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="mt-4">
                                        <div className="row">
                                            <div className="col-4 move-cost-card__section__details__title">
                                                <p>VAT (15%)</p>
                                            </div>
                                            <div className="col-4 csTablecenter move-cost-card__section__details__title center">
                                                <p>
                                                    R
                                                    {(
                                                        Calculations.getSubTotal(CostSummaryState) * 0.15
                                                    ).toFixed(2)}
                                                </p>
                                            </div>
                                            <div className="col-4 move-cost-card__section__details__title move-cost-card__section__details__title--cost">
                                                <p>
                                                    R
                                                    {CostSummaryState.storage
                                                        ? (
                                                            CostSummaryState.storage.quantity *
                                                            CostSummaryState.storage.price *
                                                            0.15
                                                        ).toFixed(2)
                                                        : "0.00"}
                                                </p>
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
                                <div className="col-4 move-cost-card__section__details__title">
                                    <p>Total</p>
                                </div>
                                <div className="col-4 csTablecenter move-cost-card__section__details__title center">
                                    <p>
                                        R
                                        {(
                                            Calculations.getSubTotal(CostSummaryState) * 0.15 +
                                            Calculations.getSubTotal(CostSummaryState)
                                        ).toFixed(2)}
                                    </p>
                                </div>
                                <div className="col-4 move-cost-card__section__details__title move-cost-card__section__details__title--cost">
                                    <p>
                                        R
                                        {CostSummaryState.storage
                                            ? (
                                                CostSummaryState.storage.quantity *
                                                CostSummaryState.storage.price *
                                                1.15
                                            ).toFixed(2)
                                            : "0.00"}
                                    </p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default StorageCostCard;
