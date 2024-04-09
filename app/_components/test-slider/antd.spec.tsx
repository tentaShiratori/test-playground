import dragAntd from "@/test/event/dragAntd";
import { act, render, screen } from "@testing-library/react";
import { Slider } from "antd";

describe("Antd Slider", () => {
  it("should render correctly", async () => {
    const handleChange = jest.fn();
    const { container } = render(
      <Slider onChange={handleChange} min={0} max={1} step={0.1} value={0} />,
    );
    const target = container.querySelector(".ant-slider");
    Object.defineProperty(target, "getBoundingClientRect", {
      value: jest
        .fn()
        .mockReturnValue({ left: 0, top: 0, width: 100, height: 10 }),
    });
    await act(async () => {
      await dragAntd(screen.getByRole("slider"), {
        delta: { x: 100, y: 0 },
      });
    });

    expect(handleChange).toHaveBeenCalled();
  });
});
