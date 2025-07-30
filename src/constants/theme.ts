import { ColorConstants } from "./website";

// Modern dark mode color constants
export const DarkColorConstants = {
  // Modern background colors - using slate and neutral tones
  background: "#0f172a", // Slate 900
  surface: "#1e293b", // Slate 800
  card: "#334155", // Slate 700

  // Modern text colors with better contrast
  text: "#f8fafc", // Slate 50
  textSecondary: "#cbd5e1", // Slate 300
  textMuted: "#94a3b8", // Slate 400

  // Modern border colors
  border: "#475569", // Slate 600
  borderLight: "#64748b", // Slate 500

  // Modern gray scale using slate palette
  gray10: "#0f172a", // Slate 900
  gray20: "#1e293b", // Slate 800
  gray25: "#334155", // Slate 700
  gray30: "#475569", // Slate 600
  gray40: "#64748b", // Slate 500
  gray50: "#94a3b8", // Slate 400
  gray60: "#cbd5e1", // Slate 300
  gray70: "#e2e8f0", // Slate 200
  gray90: "#f1f5f9", // Slate 100

  // Modern black/white inversions
  black: "#f8fafc", // Slate 50
  black10: "#e2e8f0", // Slate 200
  black50: "#f8fafc80",
  black80: "#f8fafccc",
  black90: "#f8fafcaa",
  black100: "#f8fafcaa",

  // Other colors with modern dark mode adjustments
  lineGray: "#475569", // Slate 600
  lightGray: "#1e293b", // Slate 800
  lightestGray: "#334155", // Slate 700
  darkerGray: "#94a3b8", // Slate 400
  gray: "#cbd5e1", // Slate 300
  darkGray: "#64748b", // Slate 500
  darkestGray: "#94a3b8", // Slate 400
  softGray: "#0f172a", // Slate 900

  // Modern brand colors with better contrast
  blue: "#3b82f6", // Blue 500
  blue90: "#60a5fa", // Blue 400
  blue10: "#1e3a8a", // Blue 800

  success: "#10b981", // Emerald 500
  danger: "#ef4444", // Red 500
  error: "#ef4444", // Red 500
  error50: "#450a0a", // Red 900

  primary: "#3b82f6", // Blue 500
  primary50: "#1e3a8a", // Blue 800
  primary60: "#60a5fa", // Blue 400
  primary70: "#3b82f6", // Blue 500
  primary80: "#3b82f640",
  primary90: "#1e3a8a", // Blue 800

  main: "#ec4899", // Pink 500
  main60: "#ec4899ab",
  main80: "#ec489911",
  main50: "#831843", // Pink 900
  main500: "#f97316", // Orange 500

  green: "#10b981", // Emerald 500
  green50: "#064e3b", // Emerald 900
  green70: "#065f46", // Emerald 800
  green60: "#10b981", // Emerald 500
  darkerGreen: "#059669", // Emerald 600

  ink: "#3b82f6", // Blue 500
  ink60: "#8b5cf6", // Violet 500

  fire: "#450a0a", // Red 900
  brown10: "#451a03", // Amber 900
  yellow90: "#f59e0b", // Amber 500
  bg: "#0f172a", // Slate 900
  pink60: "#ec4899", // Pink 500
} as const;

// Theme type for type safety
export type ThemeMode = "light" | "dark";

// Function to get current theme colors
export const getThemeColors = (isDarkMode: boolean) => {
  return isDarkMode ? DarkColorConstants : ColorConstants;
};
