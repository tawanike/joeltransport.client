import { Button } from "react-bootstrap";
import { BsCheck2 } from "react-icons/bs";
import uuid from "react-uuid";
import { homeMoversConfig } from "../../_configurations/benefits.config";
import { pricingConfig } from "../../_configurations/pricing.config";
import { pageSections } from "../../_configurations/resourcesPageSections.config";
import { RightImageSectionConfig } from "../../_configurations/rightsection.config";
import BlueSection from "./blueSection.component";
import RightImageSection from "./rightImageSection.component";

const HomeMoversView = ({ getQuote }: any) => {
  return (
    <>
      <RightImageSection
        {...(pageSections.planToMove as RightImageSectionConfig)}
        getQuote={getQuote}
      />
      <BlueSection {...homeMoversConfig} />
      <RightImageSection
        {...(pageSections.hustleFreeMove as RightImageSectionConfig)}
        getQuote={getQuote}
      />
      <div className="resources__pricing col-12 mt-5">
        <div className="row">
          <div className="container pt-5 pb-2">
            <div className="row">
              <div className="resources__pricing__title col-12">
                <p>Our standard pricing for local moves</p>
              </div>
              <div className="resources__pricing__description col-12 col-md-6 offset-md-3 my-3">
                <p>Pricing for moving within a 60 km radius of Centurion.</p>
              </div>
              <div className="resources__pricing__prices col-8 offset-2 pb-5">
                <div className="row">
                  {pricingConfig.map((price) => (
                    <div key={uuid()}>
                      <div className="col-12 mb-3 mb-md-0 col-md-4 resources__pricing__prices-container">
                        <div className="col-12 resources__pricing__prices-container__item">
                          <div className="col-12 resources__pricing__prices-container__item-head">
                            <p>{price.title}</p>
                          </div>
                          <div className="col-12 resources__pricing__prices-container__item-summary">
                            <p>{price.description}</p>
                          </div>
                          <div className="col-10 offset-1 resources__pricing__prices-container__item-price">
                            <p>
                              {price.price}{" "}
                              <span className="exvat">/excl. VAT</span>
                            </p>
                          </div>
                          {price.details.map((x) => (
                            <>
                              <div
                                key={uuid()}
                                className="col-12 resources__pricing__prices-container__item-list"
                              >
                                <div className="row">
                                  <div className="col-2 icon">
                                    <BsCheck2 />
                                  </div>
                                  <div className="col-10 text">
                                    <p>{x}</p>
                                  </div>
                                </div>
                              </div>
                            </>
                          ))}
                          <div className="col-12 resources__pricing__prices-container__item-button">
                            <Button
                              variant="secondary"
                              className="quoteBtn"
                              onClick={() => getQuote(true)}
                            >
                              Get a quote
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeMoversView;
