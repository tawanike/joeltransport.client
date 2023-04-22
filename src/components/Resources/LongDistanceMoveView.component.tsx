import { BlueSectionConfig } from "../../_configurations/blueSection.config";
import { domesticMovesConfig } from "../../_configurations/resourcesPageSections.config";
import { RightImageSectionConfig } from "../../_configurations/rightsection.config";
import BlueSection from "./blueSection.component";
import RelatedArticles from "./relatedArticles.component";
import RightImageSection from "./rightImageSection.component";

const OfficeRemovalsComponent = () => {
  return (
    <>
      <RightImageSection
        {...(domesticMovesConfig as RightImageSectionConfig)}
      />
      <BlueSection {...(domesticMovesConfig.benefits as BlueSectionConfig)} />

      <RelatedArticles />
    </>
  );
};

export default OfficeRemovalsComponent;
