import { ReactNode } from "react";
import { BlueSectionConfig } from "./blueSection.config";

export type RightImageSectionConfig = {
  id: number;
  title: string;
  description: ReactNode;
  image: string;
  secondaryButton?: { title: string; action?: string };
  primaryButton?: { title: string; action?: string };
  getQuote?: any;
};

export interface ResourcesPageSectionConfig {
  planToMove: RightImageSectionConfig | BlueSectionConfig;
  hustleFreeMove: RightImageSectionConfig | BlueSectionConfig;
  relocateLocally: RightImageSectionConfig | BlueSectionConfig;
  benefits: RightImageSectionConfig | BlueSectionConfig;
  internationally: RightImageSectionConfig | BlueSectionConfig;
  storageLocally: RightImageSectionConfig | BlueSectionConfig;
  pet: RightImageSectionConfig | BlueSectionConfig;
  art: RightImageSectionConfig | BlueSectionConfig;
  vehicle: RightImageSectionConfig | BlueSectionConfig;
  danger: RightImageSectionConfig | BlueSectionConfig;
}
