import { fireEvent } from "@testing-library/react";

export default function dragAntd(
  elm: HTMLElement,
  {
    delta,
  }: {
    delta: { x: number; y: number };
  },
) {
  const mousedown = new MouseEvent("mousedown", {
    bubbles: true,
    cancelable: true,
  });
  Object.assign(mousedown, { pageX: 0, pageY: 0 });

  fireEvent(elm, mousedown);
  const mousemove = new MouseEvent("mousemove", {
    bubbles: true,
    cancelable: true,
  });
  Object.assign(mousemove, { pageX: delta.x, pageY: delta.y });
  fireEvent(document, mousemove);
  fireEvent.mouseUp(document);
}
