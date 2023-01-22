import { specializedServicesSections } from "../../_configurations/resourcesPageSections.config";
import { RightImageSectionConfig } from "../../_configurations/rightsection.config";
import LeftImageSection from "./leftImageSection.component";
import RelatedArticles from "./relatedArticles.component";
import RightImageSection from "./rightImageSection.component";

const SpecialisedServicesComponent = () => {
    return <>
        <RightImageSection {...(specializedServicesSections.pet as RightImageSectionConfig)} />
        <LeftImageSection {...(specializedServicesSections.art as RightImageSectionConfig)} />
        <RightImageSection {...(specializedServicesSections.vehicle as RightImageSectionConfig)} />
        <LeftImageSection {...(specializedServicesSections.danger as RightImageSectionConfig)} />
        <RelatedArticles />
    </>
}

export default SpecialisedServicesComponent;
