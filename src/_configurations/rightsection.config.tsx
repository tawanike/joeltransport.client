import { ReactNode } from "react";
import { BlueSectionConfig } from "./blueSection.config";

export type RightImageSectionConfig = {
  id: number;
  title: string;
  description: ReactNode;
  image: string;
  secondaryButton?: { title: string; action?: string };
  primaryButton?: { title: string; action?: string };
  getQuote: any;
};

export interface ResourcesPageSectionConfig {
  [key: string]: RightImageSectionConfig | BlueSectionConfig;
}
