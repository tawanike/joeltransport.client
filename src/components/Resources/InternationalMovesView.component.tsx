import { BlueSectionConfig } from "../../_configurations/blueSection.config";
import { internationalMovesConfig } from "../../_configurations/resourcesPageSections.config";
import { RightImageSectionConfig } from "../../_configurations/rightsection.config";
import BlueSection from "./blueSection.component";
import RelatedArticles from "./relatedArticles.component";
import RightImageSection from "./rightImageSection.component";

const OfficeRemovalsComponent = () => {
  return (
    <>
      <RightImageSection
        {...(internationalMovesConfig as RightImageSectionConfig)}
      />
      <BlueSection
        {...(internationalMovesConfig.benefits as BlueSectionConfig)}
      />

      <RelatedArticles />
    </>
  );
};

export default OfficeRemovalsComponent;
