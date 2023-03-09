/* eslint-disable react/no-unescaped-entities */
import { useContext } from "react";
import { BookingContext } from "src/_contexts/booking.context";
import { Calculations } from "src/_helpers/calculations";
import CostSummaryStateContext from "../../_contexts/costSummary.context";

const StorageCostCard = () => {
  const { CostSummaryState, dispatchCostSummary } = useContext(
    CostSummaryStateContext
  );
  const bookingContext = useContext(BookingContext);

  return (
    <>
      <div className="col-12 storage-cost-card">
        <div className="row">
          <div className="col-12 storage-cost-card__head">
            <div className="row">
              <div className="col-4 storage-cost-card__head--start">
                <p>Quote summary</p>
              </div>
              <div className="col-4 storage-cost-card__head--center">
                <p>First month's charges</p>
              </div>
              <div className="col-4 storage-cost-card__head--end">
                <p>Monthly charges</p>
              </div>
            </div>
          </div>
          <div className="col-12 move-cost-card__section">
            <div className="row">
              <div className="col-12 move-cost-card__section__head">
                <p>Storage charge</p>
              </div>
              <div className="col-12 move-cost-card__section__details">
                <ul>
                  <li>
                    <div className="row">
                      <div className="col-4 move-cost-card__section__details__title">
                        <p>Storage units</p>
                      </div>
                      <div className="col-4 move-cost-card__section__details__title center move-cost-card__section__details__title--cost">
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
          </div>
          {bookingContext.state.formValues.collection && (
            <div className="col-12 move-cost-card__section">
              <div className="row">
                <div className="col-12 move-cost-card__section__head">
                  <p>Moving charge</p>
                </div>
                <div className="col-12 move-cost-card__section__details">
                  <ul>
                    <li>
                      <div className="row">
                        <div className="col-4 move-cost-card__section__details__title">
                          <p>Truck & Crew</p>
                        </div>
                        <div className="col-4 move-cost-card__section__details__title center move-cost-card__section__details__title--cost">
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
                    <li>
                      <div className="row">
                        <div className="col-4 move-cost-card__section__details__title">
                          <p>Off peak discount</p>
                        </div>
                        <div className="col-4 move-cost-card__section__details__title center move-cost-card__section__details__title--cost">
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
                    <li>
                      <div className="row">
                        <div className="col-4 move-cost-card__section__details__title">
                          <p>Bakkie shuttle</p>
                        </div>
                        <div className="col-4 move-cost-card__section__details__title center move-cost-card__section__details__title--cost">
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
                      <div className="col-4 move-cost-card__section__details__title center">
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
                      <div className="col-4 move-cost-card__section__details__title center">
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
                <div className="col-4 move-cost-card__section__details__title center">
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
