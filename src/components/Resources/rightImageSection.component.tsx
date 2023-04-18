import { FC } from "react";
import { Button } from "react-bootstrap";
import { RightImageSectionConfig } from "../../_configurations/rightsection.config";
import CallMeBackButton from "../shared/callMeBackButton.component";

const RightImageSection: FC<RightImageSectionConfig> = ({
    title,
    description,
    image,
    secondaryButton,
    primaryButton,
    getQuote,
}) => {
    return (
        <>
            <div className="resources__documents container mt-5">
                <div className="row">
                    <div className="resources__product-description col-12">
                        <div className="row">
                            <div className="resources__product-description__summary col-12 col-md-6">
                                <div className="resources__product-description__summary__information-head">
                                    <p>{title} </p>
                                </div>
                                <div className="resources__product-description__summary__information-summary">
                                    {description}
                                </div>
                                <div className="resources__product-description__summary__information-button py-3">
                                    {secondaryButton && (
                                        <CallMeBackButton title={secondaryButton.title} />
                                    )}

                                    {primaryButton && (
                                        <Button variant="secondary" onClick={() => getQuote(true)}>
                                            {primaryButton.title}
                                        </Button>
                                    )}
                                </div>
                            </div>
                            <div className="resources__product-description__image col-12 col-md-6 mt-3 mt-md-0">
                                <img src={image} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RightImageSection;
