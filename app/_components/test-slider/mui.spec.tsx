import dragTouch from "@/test/event/dragTouch";
import Slider from "@mui/material/Slider";
import { render, screen } from "@testing-library/react";

describe("Mui Slider", () => {
  it("should render correctly", async () => {
    const handleChange = jest.fn();
    render(
      <Slider
        onChange={handleChange}
        min={0}
        max={1}
        step={0.1}
        value={0}
        aria-label="slider"
      />,
    );
    await dragTouch(screen.getByRole("slider"), {
      delta: { x: 100, y: 0 },
    });

    expect(handleChange).toHaveBeenCalled();
  });
});
