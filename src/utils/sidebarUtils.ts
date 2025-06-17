import { MenuItem } from "../interfaces/menu";

// Utility functions for sidebar components
export const getIconFill = (isActive: boolean): string => 
  isActive ? "var(--main)" : "var(--gray)";

export const getTextClass = (isActive: boolean): string => 
  isActive ? "text-[var(--main)] font-medium" : "";

export const getMenuLinkClass = (isActive: boolean): string => 
  isActive ? "text-[var(--black)]" : "text-[var(--gray)]";

export const getActiveTextClass = (isActive: boolean): string => 
  isActive ? "active text-[var(--main)]" : "text-[var(--gray)]";

// Helper function to convert active prop to boolean
export const isActiveItem = (active: string | boolean, itemId: string): boolean => {
  if (typeof active === 'boolean') return active;
  if (typeof active === 'string') return active === itemId;
  return false;
};

// Utility function to check if item should be rendered
export const shouldRenderItem = (el: MenuItem): boolean => {
  return typeof el.title === 'string' && el.title.trim() !== "" && el.sidebar;
};

// Get location name from pathname
export const getLocationName = (pathname: string): string => {
  const path = pathname.substring(1);
  const arr = path.split("/");
  if (arr.length > 2 && arr[2] !== "add") {
    return arr[0] + "/" + arr[1] + "/:id";
  }
  return path;
};

// Filter visible sidebar items
export const getVisibleSidebarItems = (items: MenuItem[]): MenuItem[] => {
  return items.filter(shouldRenderItem);
};

// Check if path matches current location
export const isPathActive = (path: string, currentPath: string): boolean => {
  return currentPath.startsWith(path);
}; 