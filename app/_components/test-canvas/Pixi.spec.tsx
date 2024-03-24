import {
  fireEvent,
  render,
  screen,
  waitFor,
  act,
} from "@testing-library/react";
import { Pixi } from "./Pixi";
import userEvent from "@testing-library/user-event";

describe("Pixi", () => {
  it("should render", async () => {
    const handleClick = jest.fn();
    const { container, rerender } = render(<Pixi onClick={handleClick} />);
    await waitFor(
      async () => {
        expect(container.querySelector("#pixi")).not.toBeNull();
      },
      { timeout: 5000 }
    );
    rerender(<Pixi onClick={handleClick} />);
    const pixi = container.querySelector("#pixi");
    if (pixi === null) {
      throw new Error("pixi is null");
    }
    for (let i = 100; i < 200; i += 10) {
      for (let j = 100; j < 200; j += 10) {
        await userEvent.pointer([
          {
            keys: "[MouseLeft]",
            target: pixi,
            coords: { clientX: i, clientY: j },
          },
        ]);
        expect(handleClick).not.toHaveBeenCalled();
      }
    }
  }, 15000);
});
