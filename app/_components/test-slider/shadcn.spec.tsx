import { Slider } from "@/components/ui/slider";
import { expectAccessible } from "@/test/a11y/jest";
import dragPointer from "@/test/event/dragPointer";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

describe("Shadcn Slider", () => {
  it("should render correctly", async () => {
    const handleChange = jest.fn();
    render(
      <Slider
        aria-label="slider"
        onValueChange={handleChange}
        min={0}
        max={1}
        step={0.1}
        style={{ width: "100px" }}
      />,
    );
    const target = screen.getByLabelText("slider");

    Object.defineProperty(target, "getBoundingClientRect", {
      value: jest
        .fn()
        .mockReturnValue({ left: 0, top: 0, width: 100, height: 10 }),
    });
    await dragPointer(target, {
      delta: { x: 100, y: 0 },
    });

    expect(handleChange).toHaveBeenCalled();
  });

  it("check accessibility", async () => {
    expectAccessible(
      <Slider min={0} max={1} step={0.1} style={{ width: "100px" }} />,
    );
  });
});
