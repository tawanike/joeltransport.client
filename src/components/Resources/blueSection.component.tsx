import { FC } from "react";
import { BlueSectionConfig } from "../../_configurations/blueSection.config";

const BlueSection: FC<BlueSectionConfig> = ({ title, description, listItems }) => {
    return <>
        <div className="resources__benefits col-12 mt-5">
            <div className="row">
                <div className="container pt-5 pb-2">
                    <div className="row">
                        <div className="col-6 resources__benefits__summary">
                            <div className="resources__benefits__summary__information-head">
                                <p>{title}</p>
                            </div>
                            <div className="resources__benefits__summary__information-summary">
                                {description}
                            </div>
                        </div>
                        <div className="col-6">
                            <ul className="row">
                                {
                                    listItems.map(benft => <>
                                        <li key={benft.id} className="col-6 resources__benefits__outline mb-5">
                                            <div className="row">
                                                <div className="col-12 resources__benefits__outline__icon">
                                                    <div className="icon-container">
                                                        {benft.icon}
                                                    </div>
                                                </div>
                                                <div className="col-12 resources__benefits__outline__head my-1">
                                                    <p>{benft.title}</p>
                                                </div>
                                                <div className="col-12 resources__benefits__outline__summary">
                                                    {benft.description}
                                                </div>
                                            </div>
                                        </li>
                                    </>)}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default BlueSection;
