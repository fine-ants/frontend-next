import { IconType } from "../Icon";

export type DrawerItemType = {
  icon: IconType;
  title: string;
  onClick: () => void;
};
