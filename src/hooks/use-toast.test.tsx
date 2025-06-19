import { act, renderHook } from "@testing-library/react";
import { useToast, toast, reducer } from "./use-toast";

describe("useToast hook", () => {
  beforeEach(() => {
    if (globalThis.jest) jest.useFakeTimers();
  });

  afterEach(() => {
    if (globalThis.jest) jest.clearAllTimers();
  });

  it("should add a toast", () => {
    const { result } = renderHook(() => useToast());
    act(() => {
      result.current.toast({ title: "Test Toast" });
    });
    expect(result.current.toasts.length).toBe(1);
    expect(result.current.toasts[0].title).toBe("Test Toast");
    expect(result.current.toasts[0].open).toBe(true);
  });

  it("should limit the number of toasts to TOAST_LIMIT", () => {
    const { result } = renderHook(() => useToast());
    act(() => {
      result.current.toast({ title: "Toast 1" });
      result.current.toast({ title: "Toast 2" });
    });
    expect(result.current.toasts.length).toBe(1);
    expect(result.current.toasts[0].title).toBe("Toast 2");
  });

  it("should dismiss a toast", () => {
    const { result } = renderHook(() => useToast());
    let toastObj: ReturnType<typeof toast>;
    act(() => {
      toastObj = result.current.toast({ title: "Dismiss me" });
    });
    act(() => {
      result.current.dismiss(toastObj.id);
    });
    expect(result.current.toasts[0].open).toBe(false);
  });

  it("should update a toast", () => {
    const { result } = renderHook(() => useToast());
    let toastObj: ReturnType<typeof toast>;
    act(() => {
      toastObj = result.current.toast({ title: "Old Title" });
    });
    act(() => {
      toastObj.update({ ...result.current.toasts[0], title: "New Title" });
    });
    expect(result.current.toasts[0].title).toBe("New Title");
  });

  it("should dismiss all toasts if no id is provided", () => {
    const { result } = renderHook(() => useToast());
    act(() => {
      result.current.toast({ title: "Toast 1" });
    });
    act(() => {
      result.current.dismiss();
    });
    expect(result.current.toasts[0].open).toBe(false);
  });

  it("should remove all toasts if REMOVE_TOAST with undefined id", () => {
    const state = {
      toasts: [
        { id: "1", open: true },
        { id: "2", open: true },
      ],
    } as any;
    const newState = reducer(state, {
      type: "REMOVE_TOAST",
      toastId: undefined,
    });
    expect(newState.toasts.length).toBe(0);
  });
});
