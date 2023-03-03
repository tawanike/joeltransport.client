import { useContext } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { Calculations } from "src/_helpers/calculations";
import CostSummaryStateContext from "../../_contexts/costSummary.context";

const MoveCostCard = () => {
  const { CostSummaryState, dispatchCostSummary } = useContext(
    CostSummaryStateContext
  );

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
                  <li>
                    <div className="row">
                      <div className="col-6 move-cost-card__section__details__title">
                        <p>Truck & crew</p>
                      </div>
                      <div className="col-1 move-cost-card__section__details__title">
                        <BsInfoCircle />
                      </div>
                      <div className="col-5 move-cost-card__section__details__title move-cost-card__section__details__title--cost">
                        <p>
                          R
                          {CostSummaryState.truck
                            ? CostSummaryState.truck.price
                            : "0.00"}
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div className="col-6 move-cost-card__section__details__title">
                        <p>Off peak discount</p>
                      </div>
                      <div className="col-1 move-cost-card__section__details__title">
                        <BsInfoCircle />
                      </div>
                      <div className="col-5 move-cost-card__section__details__title move-cost-card__section__details__title--cost">
                        <p>
                          R
                          {CostSummaryState.truck &&
                          CostSummaryState.truck.off_peak_discount
                            ? CostSummaryState.truck.off_peak_discount
                            : "0.00"}
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div className="col-6 move-cost-card__section__details__title">
                        <p>Bakkie shuttle</p>
                      </div>
                      <div className="col-1 move-cost-card__section__details__title">
                        <BsInfoCircle />
                      </div>
                      <div className="col-5 move-cost-card__section__details__title move-cost-card__section__details__title--cost">
                        <p>
                          R
                          {CostSummaryState.bakkieShuttle
                            ? CostSummaryState.bakkieShuttle.price *
                              CostSummaryState.bakkieShuttle.quantity
                            : "0.00"}
                        </p>
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
                        <p>R{Calculations.getSubTotal(CostSummaryState)}</p>
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
                          R{Calculations.getSubTotal(CostSummaryState) * 0.15}
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
                    R
                    {Calculations.getSubTotal(CostSummaryState) * 0.15 +
                      Calculations.getSubTotal(CostSummaryState)}
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
