import { fireEvent } from "@testing-library/react";

export default async function dragAntd(
  elm: HTMLElement,
  {
    delta,
  }: {
    delta: { x: number; y: number };
  },
) {
  const current = {
    pageX: 0,
    pageY: 0,
  };
  const step = {
    x: 100,
    y: 0,
  };
  const duration = 500;
  const steps = 20;
  const mousedown = new MouseEvent("mousedown", {
    bubbles: true,
    cancelable: true,
  });
  Object.assign(mousedown, current);

  fireEvent(elm, mousedown);
  const mousemove = new MouseEvent("mousemove", {
    bubbles: true,
    cancelable: true,
  });
  for (let i = 0; i < steps; i++) {
    current.pageX += step.x;
    current.pageY += step.y;
    await sleep(duration / steps);
    Object.assign(mousemove, current);
    fireEvent(elm, mousemove);
  }
  fireEvent.mouseUp(document);
}

const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
