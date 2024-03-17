import { fireEvent, render, screen } from "@testing-library/react";
import { Pixi } from "./Pixi";

describe("Pixi", () => {
  it("should render", () => {
    const handleClick = jest.fn();
    const { container, rerender } = render(<Pixi onClick={handleClick} />);
    rerender(<Pixi onClick={handleClick} />);
    const pixi = container.querySelector("#pixi");
    if (pixi === null) {
      throw new Error("pixi is null");
    }
    for (let i = 0; i < 1000; i += 10) {
      for (let j = 0; j < 1000; j += 10) {
        console.log(`i: ${i}, j: ${j}`);
        fireEvent.pointerDown(pixi, {
          clientX: i,
          clientY: j,
        });
        expect(handleClick).not.toHaveBeenCalled();
      }
    }
  });
});
