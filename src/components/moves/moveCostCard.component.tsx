import accounting from "accounting";
import { useContext, useRef, useState } from "react";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import { BsInfoCircle } from "react-icons/bs";
import { BookingContext } from "src/_contexts/booking.context";
import { Calculations } from "src/_helpers/calculations";
import CostSummaryStateContext from "../../_contexts/costSummary.context";
accounting.settings = {
  currency: {
    symbol: "R", // default currency symbol is '$'
    format: "%s%v", // controls output: %s = symbol, %v = value/number (can be object: see below)
    decimal: ".", // decimal point separator
    thousand: ",", // thousands separator
    precision: 2, // decimal places
  },
  number: {
    precision: 0, // default precision on numbers is 0
    thousand: ",",
    decimal: ".",
  },
};

const MoveCostCard = () => {
  const [show, setShow] = useState(false);
  const [showDiscountTooltip, setShowDiscountTooltip] = useState(false);
  const [showBukkieShuttleTooltip, setShowBukkieShuttleTooltip] =
    useState(false);

  const target = useRef(null);
  const discountTooltipTarget = useRef(null);
  const bukkieShuttleTooltipTarget = useRef(null);

  const { CostSummaryState, dispatchCostSummary } = useContext(
    CostSummaryStateContext
  );
  const bookingContext = useContext(BookingContext);

  return (
    <>
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
                  {CostSummaryState.truck && (
                    <li>
                      <div className="row">
                        <div className="col-6 move-cost-card__section__details__title">
                          <p>Truck & crew</p>
                        </div>
                        <div
                          className="col-1 move-cost-card__section__details__title"
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
                                My Tooltip
                              </Tooltip>
                            )}
                          </Overlay>
                        </div>
                        <div className="col-5 move-cost-card__section__details__title move-cost-card__section__details__title--cost">
                          <p>
                            {CostSummaryState.truck
                              ? accounting.formatMoney(
                                  Calculations.truckTotal(
                                    CostSummaryState.truck
                                  )
                                )
                              : accounting.formatMoney(0)}
                          </p>
                        </div>
                      </div>
                    </li>
                  )}
                  {CostSummaryState.truck &&
                    CostSummaryState.truck.off_peak_discount > 0 && (
                      <li>
                        <div className="row">
                          <div className="col-6 move-cost-card__section__details__title">
                            <p>Off peak discount</p>
                          </div>
                          <div
                            className="col-1 move-cost-card__section__details__title"
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
                                <Tooltip id="truck-crew" {...props}>
                                  My Tooltip
                                </Tooltip>
                              )}
                            </Overlay>
                          </div>
                          <div className="col-5 move-cost-card__section__details__title move-cost-card__section__details__title--cost">
                            <p>
                              {CostSummaryState.truck &&
                              CostSummaryState.truck.off_peak_discount
                                ? accounting.formatMoney(
                                    CostSummaryState.truck.off_peak_discount
                                  )
                                : accounting.formatMoney(0)}
                            </p>
                          </div>
                        </div>
                      </li>
                    )}
                  {CostSummaryState.bakkieShuttle && (
                    <li>
                      <div className="row">
                        <div className="col-6 move-cost-card__section__details__title">
                          <p>Bakkie shuttle</p>
                        </div>
                        <div
                          className="col-1 move-cost-card__section__details__title"
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
                                Used where a home or office estate, complex or
                                location cannot be accessed using our removals
                                trucks, or due to restrictions in an estate or
                                complex for large-sized trucks. Our bakkie
                                shuttles customer belongings to our removal
                                truck.
                              </Tooltip>
                            )}
                          </Overlay>
                        </div>
                        <div className="col-5 move-cost-card__section__details__title move-cost-card__section__details__title--cost">
                          <p>
                            R
                            {CostSummaryState.bakkieShuttle
                              ? accounting.formatMoney(
                                  CostSummaryState.bakkieShuttle.price
                                )
                              : accounting.formatMoney(0)}
                          </p>
                        </div>
                      </div>
                    </li>
                  )}
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
                        <p>
                          {accounting.formatMoney(
                            Calculations.getSubTotal(CostSummaryState)
                          )}
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="mt-4">
                    <div className="row">
                      <div className="col-6 move-cost-card__section__details__title">
                        <p>VAT (15%)</p>
                      </div>
                      <div className="col-6 move-cost-card__section__details__title move-cost-card__section__details__title--cost">
                        <p>
                          {accounting.formatMoney(
                            Calculations.getVAT(CostSummaryState)
                          )}
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
                <div className="col-6 move-cost-card__section__details__title">
                  <p>Total</p>
                </div>
                <div className="col-6 move-cost-card__section__details__title move-cost-card__section__details__title--cost">
                  <p>
                    {accounting.formatMoney(
                      Calculations.getTotal(CostSummaryState)
                    )}
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

export default MoveCostCard;
