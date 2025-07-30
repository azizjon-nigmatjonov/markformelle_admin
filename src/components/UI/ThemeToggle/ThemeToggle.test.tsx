import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { ThemeToggle } from "./index";
import themeReducer from "../../../store/theme/theme.slice";

// Create a test store
const createTestStore = (initialState = { isDarkMode: false }) => {
  return configureStore({
    reducer: {
      theme: themeReducer,
    },
    preloadedState: {
      theme: initialState,
    },
  });
};

describe("ThemeToggle", () => {
  it("renders theme toggle button", () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <ThemeToggle />
      </Provider>
    );

    const toggleButton = screen.getByRole("button");
    expect(toggleButton).toBeInTheDocument();
  });

  it("shows dark mode icon when in light mode", () => {
    const store = createTestStore({ isDarkMode: false });

    render(
      <Provider store={store}>
        <ThemeToggle />
      </Provider>
    );

    // Check for dark mode icon (should be visible in light mode)
    expect(screen.getByTestId("DarkModeIcon")).toBeInTheDocument();
  });

  it("shows light mode icon when in dark mode", () => {
    const store = createTestStore({ isDarkMode: true });

    render(
      <Provider store={store}>
        <ThemeToggle />
      </Provider>
    );

    // Check for light mode icon (should be visible in dark mode)
    expect(screen.getByTestId("LightModeIcon")).toBeInTheDocument();
  });

  it("toggles theme when clicked", () => {
    const store = createTestStore({ isDarkMode: false });

    render(
      <Provider store={store}>
        <ThemeToggle />
      </Provider>
    );

    const toggleButton = screen.getByRole("button");

    // Initially should be in light mode
    expect(store.getState().theme.isDarkMode).toBe(false);

    // Click to toggle
    fireEvent.click(toggleButton);

    // Should now be in dark mode
    expect(store.getState().theme.isDarkMode).toBe(true);

    // Click again to toggle back
    fireEvent.click(toggleButton);

    // Should be back to light mode
    expect(store.getState().theme.isDarkMode).toBe(false);
  });
});
