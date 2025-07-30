# Dark Mode Feature

This document describes the dark mode implementation in the Markformelle Admin application.

## Overview

The dark mode feature allows users to toggle between light and dark themes throughout the application. The implementation uses CSS custom properties (CSS variables) and Redux for state management.

## Implementation Details

### 1. State Management

- **Store Slice**: `src/store/theme/theme.slice.ts`
- **State**: `isDarkMode: boolean`
- **Actions**: 
  - `toggleDarkMode()` - Toggles between light and dark mode
  - `setDarkMode(boolean)` - Sets specific mode

### 2. Color System

- **Light Theme**: `src/constants/website.ts` - Original color constants
- **Dark Theme**: `src/constants/theme.ts` - Dark mode color constants
- **Dynamic Colors**: `getThemeColors(isDarkMode)` function returns appropriate colors

### 3. CSS Variables

The application uses CSS custom properties for all colors, allowing dynamic theme switching:

```css
:root {
  --black: #151515; /* Light mode */
  --surface: #ffffff; /* Light mode */
  --border: #EAECF0; /* Light mode */
}

[data-theme="dark"] {
  --black: #ffffff; /* Dark mode */
  --surface: #2d2d2d; /* Dark mode */
  --border: #404040; /* Dark mode */
}
```

### 4. Theme Toggle Component

- **Location**: `src/components/UI/ThemeToggle/index.tsx`
- **Features**:
  - Toggle button with sun/moon icons
  - Tooltip showing current mode
  - Smooth transitions
  - Responsive design

### 5. Header Integration

The theme toggle is integrated into the main header component:
- **Location**: `src/components/UI/Header/index.tsx`
- **Position**: Between language dropdown and notifications

## Key Features

### Automatic Color Application

The `ColorData` component in `src/layouts/MainLayout/Logic/index.tsx` automatically:
- Sets the `data-theme` attribute on the document
- Applies CSS variables based on current theme
- Updates colors when theme changes

### Form Element Support

Dark mode properly handles form elements:
- Input fields
- Textareas
- Select dropdowns
- MUI components
- Date pickers

### Transitions

Smooth transitions are applied to:
- Background colors
- Text colors
- Border colors
- All theme-related changes

## Usage

### For Developers

1. **Adding New Colors**: Add to both `ColorConstants` and `DarkColorConstants`
2. **Using Colors**: Use CSS variables like `var(--black)`, `var(--surface)`
3. **Testing**: Use the theme toggle in the header

### For Users

1. **Toggle Theme**: Click the sun/moon icon in the header
2. **Persistent**: Theme preference is saved and restored on page reload
3. **Smooth**: All changes animate smoothly

## Color Mapping

| Light Mode | Dark Mode | Usage |
|------------|-----------|-------|
| `#151515` | `#f8fafc` | Primary text |
| `#ffffff` | `#1e293b` | Surface backgrounds |
| `#EAECF0` | `#475569` | Borders |
| `#9092A3` | `#cbd5e1` | Secondary text |
| `#F1F1F5` | `#0f172a` | Light backgrounds |

### Modern Color Palette

The dark mode uses a modern slate-based color palette inspired by Tailwind CSS:

- **Background**: Slate 900 (`#0f172a`) - Deep, rich dark background
- **Surface**: Slate 800 (`#1e293b`) - Elevated surfaces and cards
- **Borders**: Slate 600 (`#475569`) - Subtle borders and dividers
- **Text**: Slate 50 (`#f8fafc`) - High contrast text
- **Secondary Text**: Slate 300 (`#cbd5e1`) - Secondary information
- **Accent Colors**: Modern blue, emerald, and pink tones for better accessibility

## Testing

Run the test suite to verify functionality:

```bash
npm test src/components/UI/ThemeToggle/ThemeToggle.test.tsx
```

## Future Enhancements

- System preference detection
- Custom color schemes
- Theme-specific component variants
- Accessibility improvements 