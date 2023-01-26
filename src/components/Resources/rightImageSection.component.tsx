import { FC } from "react";
import { Button } from "react-bootstrap";
import { RightImageSectionConfig } from "../../_configurations/rightsection.config";

const RightImageSection: FC<RightImageSectionConfig> = ({ title, description, image, secondaryButton, primaryButton }) => {
    return <>
        <div className="resources__documents container mt-5">
            <div className="row">
                <div className="resources__product-description col-12">
                    <div className="row">
                        <div className="resources__product-description__summary col-6">
                            <div className="resources__product-description__summary__information-head">
                                <p>{title} </p>
                            </div>
                            <div className="resources__product-description__summary__information-summary">
                                {description}
                            </div>
                            <div className="resources__product-description__summary__information-button py-3">
                                {
                                    secondaryButton &&
                                    <Button variant="outline-secondary" className='me-3'>{secondaryButton.title}</Button>
                                }

                                {
                                    primaryButton &&
                                    <Button variant="secondary">{primaryButton.title}</Button>
                                }
                            </div>
                        </div>
                        <div className="resources__product-description__image col-6">
                            <img src={image} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default RightImageSection;
