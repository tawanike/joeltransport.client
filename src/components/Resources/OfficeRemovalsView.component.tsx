import { BlueSectionConfig } from "../../_configurations/blueSection.config";
import { officeMoveSections } from "../../_configurations/resourcesPageSections.config";
import { RightImageSectionConfig } from "../../_configurations/rightsection.config";
import BlueSection from "./blueSection.component";
import LeftImageSection from "./leftImageSection.component";
import RelatedArticles from "./relatedArticles.component";
import RightImageSection from "./rightImageSection.component";

const OfficeRemovalsComponent = () => {
    return <>
        <RightImageSection {...(officeMoveSections.relocateLocally as RightImageSectionConfig)} />
        <BlueSection {...(officeMoveSections.benefits as BlueSectionConfig)} />
        <LeftImageSection {...(officeMoveSections.internationally as RightImageSectionConfig)} />
        <RelatedArticles />
    </>
}

export default OfficeRemovalsComponent;
