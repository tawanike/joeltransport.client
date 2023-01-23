import { Button } from "react-bootstrap";
import { BsCheck2 } from "react-icons/bs";
import { pricingConfig } from "../../_configurations/pricing.config";
import uuid from "react-uuid";
import RightImageSection from "./rightImageSection.component";
import { homeMoversConfig } from "../../_configurations/benefits.config";
import { pageSections } from "../../_configurations/resourcesPageSections.config";
import BlueSection from "./blueSection.component";
import { RightImageSectionConfig } from "../../_configurations/rightsection.config";

const HomeMoversView = () => {
    return <>
        <RightImageSection {...(pageSections.planToMove as RightImageSectionConfig)} />
        <BlueSection {...homeMoversConfig} />
        <RightImageSection {...(pageSections.hustleFreeMove as RightImageSectionConfig)} />
        <div className="resources__pricing col-12 mt-5">
            <div className="row">
                <div className="container pt-5 pb-2">
                    <div className="row">
                        <div className="resources__pricing__title col-12">
                            <p>Our standard pricing for local moves</p>
                        </div>
                        <div className="resources__pricing__description col-6 offset-3 my-3">
                            <p>Pricing for moving within a 60 km radius of Centurion. Click on the get a quote button
                                to get a free quote online or request a call back from one of our specialists.</p>
                        </div>
                        <div className="resources__pricing__prices col-8 offset-2 pb-5">
                            <div className="row">
                                {
                                    pricingConfig.map(price => <>
                                        <div key={uuid()} className="col-4 resources__pricing__prices-container">
                                            <div className="col-12 resources__pricing__prices-container__item">
                                                <div className="col-12 resources__pricing__prices-container__item-head">
                                                    <p>{price.title}</p>
                                                </div>
                                                <div className="col-12 resources__pricing__prices-container__item-summary">
                                                    <p>{price.description}</p>
                                                </div>
                                                <div className="col-10 offset-1 resources__pricing__prices-container__item-price">
                                                    <p>{price.price} <span className="exvat">/ex VAT</span></p>
                                                </div>
                                                {
                                                    price.details.map(x => <>
                                                        <div key={uuid()} className="col-12 resources__pricing__prices-container__item-list">
                                                            <div className="row">
                                                                <div className="col-2 icon">
                                                                    <BsCheck2 />
                                                                </div>
                                                                <div className="col-10 text">
                                                                    <p>{x}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>)
                                                }
                                                <div className="col-12 resources__pricing__prices-container__item-button">
                                                    <Button variant="secondary" className="quoteBtn">Get a quote</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </>)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="resources__documents container mt-5">
            <div className="row">
                <div className="resources__product-description col-12">
                    <div className="row">
                        <div className="resources__product-description__image col-6">
                            <img src="/img/services/plain-tail.png" alt="" />
                        </div>

                        <div className="resources__product-description__summary col-6">
                            <div className="resources__product-description__summary__information-head">
                                <p>Do you plan to move your home Internationally? </p>
                            </div>
                            <div className="resources__product-description__summary__information-summary">
                                <p>We offers full range of international moving service, from packing, crating, shipping to customs clearance and storage. To ensure that your move is smooth and seamless, we assign you a personal move assistant to guide you through every step.
                                    <br /><br />
                                    The services we offer under International moves are: Lower Container Load Service – where cargo is collected crated, consolidated and dispatched in 30 days period. This is a faster convenient solution for our clients. Full Container Load Service – for larger loads of either 6 or 12 cubic meter containers are used. This is faster and the most efficient shipping method for larger loads. Air Freight Service, this is the most preferred method by most customers, it is fast and safe.
                                </p>
                            </div>
                            <div className="resources__product-description__summary__information-button py-3">
                                <Button variant="outline-secondary" className='me-3'>Call me back</Button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </>
}

export default HomeMoversView;
