import { ReactNode } from "react";
import { BlueSectionListItemConfig } from "./benefits.config";

export type BlueSectionConfig = {
  id: number;
  title: string;
  description: ReactNode;
  listItems: BlueSectionListItemConfig[];
  getQuote?: any;
};
