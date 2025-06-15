import { render, act } from "@testing-library/react";
import { ThemeProvider, useTheme } from "./useTheme";

describe("ThemeProvider and useTheme", () => {
  let getItemSpy: jest.SpyInstance;
  let setItemSpy: jest.SpyInstance;
  let removeSpy: jest.SpyInstance;

  beforeEach(() => {
    getItemSpy = jest.spyOn(window.localStorage.__proto__, "getItem");
    setItemSpy = jest.spyOn(window.localStorage.__proto__, "setItem");
    removeSpy = jest.spyOn(document.documentElement.classList, "remove");
    jest.spyOn(document.documentElement.classList, "add");
    window.localStorage.clear();
    document.documentElement.className = "";
  });

  afterEach(() => {
    getItemSpy.mockRestore();
    setItemSpy.mockRestore();
    removeSpy.mockRestore();
    document.documentElement.className = "";
  });

  function TestComponent() {
    const { theme, setTheme, toggleTheme } = useTheme();
    return (
      <div>
        <span data-testid="theme">{theme}</span>
        <button onClick={() => setTheme("light")}>Set Light</button>
        <button onClick={toggleTheme}>Toggle</button>
      </div>
    );
  }

  it("provides default theme if no localStorage value", () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(getByTestId("theme").textContent).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("uses theme from localStorage if present", () => {
    window.localStorage.setItem("theme", "light");
    const { getByTestId } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(getByTestId("theme").textContent).toBe("light");
    expect(document.documentElement.classList.contains("light")).toBe(true);
  });

  it("setTheme updates theme and localStorage", () => {
    const { getByText, getByTestId } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    act(() => {
      getByText("Set Light").click();
    });
    expect(getByTestId("theme").textContent).toBe("light");
    expect(window.localStorage.getItem("theme")).toBe("light");
    expect(document.documentElement.classList.contains("light")).toBe(true);
  });

  it("toggleTheme toggles between dark and light", () => {
    const { getByText, getByTestId } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(getByTestId("theme").textContent).toBe("dark");
    act(() => {
      getByText("Toggle").click();
    });
    expect(getByTestId("theme").textContent).toBe("light");
    expect(window.localStorage.getItem("theme")).toBe("light");
    expect(document.documentElement.classList.contains("light")).toBe(true);

    act(() => {
      getByText("Toggle").click();
    });
    expect(getByTestId("theme").textContent).toBe("dark");
    expect(window.localStorage.getItem("theme")).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });
});
