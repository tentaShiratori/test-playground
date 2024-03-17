import { render, screen } from "@testing-library/react";
import { Canvas } from "./Canvas";

describe("Canvas", () => {
  it("should render", () => {
    const { container } = render(<Canvas />);
    screen.debug(container);
  });
});
