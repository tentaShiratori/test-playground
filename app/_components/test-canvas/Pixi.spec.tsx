import { fireEvent, render, waitFor } from "@testing-library/react";
import { Pixi } from "./Pixi";

describe("Pixi", () => {
  it.skip("should render", async () => {
    const handleClick = jest.fn();
    const { container, rerender } = render(<Pixi onClick={handleClick} />);
    await waitFor(
      async () => {
        expect(container.querySelector("#pixi")).not.toBeNull();
      },
      { timeout: 5000 },
    );
    rerender(<Pixi onClick={handleClick} />);
    const pixi = container.querySelector("#pixi");
    if (pixi === null) {
      throw new Error("pixi is null");
    }
    for (let i = 100; i < 200; i += 10) {
      for (let j = 100; j < 200; j += 10) {
        fireEvent.pointerDown(pixi, { clientX: i, clientY: j });
        expect(handleClick).not.toHaveBeenCalled();
      }
    }
  }, 15000);
});
