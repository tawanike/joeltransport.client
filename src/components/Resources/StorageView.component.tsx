import { useRouter } from "next/router";
import { Button } from "react-bootstrap";
import { BsCheck2 } from "react-icons/bs";
import uuid from "react-uuid";
import { BlueSectionConfig } from "../../_configurations/blueSection.config";
import { storageSections } from "../../_configurations/resourcesPageSections.config";
import { RightImageSectionConfig } from "../../_configurations/rightsection.config";
import BlueSection from "./blueSection.component";
import LeftImageSection from "./leftImageSection.component";
import RelatedArticles from "./relatedArticles.component";
import RightImageSection from "./rightImageSection.component";

const StorageComponent = ({ getQuote }: any) => {
  const router = useRouter();
  const details = ["Wooden crates​", "Size 1000 m2"];
  return (
    <>
      <RightImageSection
        {...(storageSections.storageLocally as RightImageSectionConfig)}
      />
      <BlueSection {...(storageSections.benefits as BlueSectionConfig)} />
      <div className="resources__pricing col-12">
        <div className="row">
          <div className="container pt-5 pb-2">
            <div className="row">
              <div className="resources__pricing__prices col-12 pb-5">
                <div className="row">
                  <div className="col-3 resources__pricing__prices-container">
                    <div className="col-12 resources__pricing__prices-container__item">
                      <div className="col-12 resources__pricing__prices-container__item-head">
                        <p>Standard 1 bed move</p>
                      </div>
                      <div className="col-12 resources__pricing__prices-container__item-summary">
                        <p>Starting at per storage unit</p>
                      </div>
                      <div className="col-10 offset-1 resources__pricing__prices-container__item-price">
                        <p>
                          R 350.00<span className="exvat">/ex VAT</span>
                        </p>
                      </div>
                      {details.map((x) => (
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
                    </div>
                  </div>
                  <div className="resources__product-description__summary col-7 offset-1">
                    <div className="resources__product-description__summary__information-head">
                      <p>Our standard pricing for local storage.</p>
                    </div>
                    <div className="resources__product-description__summary__information-summary">
                      <p>
                        Our storage is charged monthly, we offer short term or
                        long term storage services. Minimum storage period is
                        one month
                      </p>
                    </div>
                    <div className="resources__product-description__summary__information-button py-3">
                      <Button
                        variant="outline-secondary"
                        className="me-3"
                        onClick={() => router.push("/contact-us")}
                      >
                        Call me back
                      </Button>
                      <Button
                        variant="secondary"
                        className="me-3"
                        onClick={() => getQuote(true)}
                      >
                        Get a quote
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LeftImageSection
        {...(storageSections.internationally as RightImageSectionConfig)}
      />
      <RelatedArticles />
    </>
  );
};

export default StorageComponent;
