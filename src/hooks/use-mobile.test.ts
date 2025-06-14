import { renderHook, act } from "@testing-library/react";
import { useIsMobile } from "./use-mobile";

describe("useIsMobile", () => {
  const originalInnerWidth = window.innerWidth;
  let matchMediaMock: jest.SpyInstance;

  beforeEach(() => {
    matchMediaMock = jest
      .spyOn(window, "matchMedia")
      .mockImplementation((query: string) => {
        return {
          matches: window.innerWidth < 768,
          media: query,
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          onchange: null,
          dispatchEvent: jest.fn(),
        } as any;
      });
  });

  afterEach(() => {
    matchMediaMock.mockRestore();
    window.innerWidth = originalInnerWidth;
  });

  it("returns true when window.innerWidth is less than 768", () => {
    window.innerWidth = 500;
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it("returns false when window.innerWidth is greater than or equal to 768", () => {
    window.innerWidth = 900;
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it("updates when window is resized", () => {
    let changeHandler: (() => void) | undefined;
    matchMediaMock.mockImplementation((query: string) => {
      return {
        matches: window.innerWidth < 768,
        media: query,
        addEventListener: (_: string, cb: () => void) => {
          changeHandler = cb;
        },
        removeEventListener: jest.fn(),
        onchange: null,
        dispatchEvent: jest.fn(),
      } as any;
    });

    window.innerWidth = 900;
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);

    window.innerWidth = 500;
    act(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      changeHandler && changeHandler();
    });
    expect(result.current).toBe(true);
  });
});
