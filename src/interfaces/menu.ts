import { ReactNode } from "react";

export interface MenuItem {
  id: string;
  parent?: string;
  parent_link?: string;
  path: string;
  title: string;
  icon: string | ReactNode;
  parent_icon?: string | ReactNode;
  sidebar: boolean;
  children?: MenuItem[];
  auth?: boolean;
  permissions?: string[];
  element?: ReactNode;
  link?: string;
}

export interface MenuSection {
  [key: string]: MenuItem[];
} 