import { fireEvent } from "@testing-library/dom";

// https://stackoverflow.com/a/53946549/1179377
function isElement(obj: unknown): obj is HTMLElement {
  if (typeof obj !== "object") {
    return false;
  }
  let prototypeStr: string;
  let prototype: unknown;
  let tmpObj: unknown = obj;
  do {
    prototype = Object.getPrototypeOf(tmpObj);
    // to work in iframe
    prototypeStr = Object.prototype.toString.call(prototype);
    // '[object Document]' is used to detect document
    if (
      prototypeStr === "[object Element]" ||
      prototypeStr === "[object Document]"
    ) {
      return true;
    }
    tmpObj = prototype;
    // null is the terminal of object
  } while (prototype !== null);
  return false;
}

function getElementClientCenter(element: HTMLElement) {
  const { left, top, width, height } = element.getBoundingClientRect();
  return {
    x: left + width / 2,
    y: top + height / 2,
  };
}

const getCoords = (charlie: HTMLElement | { x: number; y: number }) =>
  isElement(charlie) ? getElementClientCenter(charlie) : charlie;

const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export default async function dragTouch(
  element: HTMLElement,
  {
    to: inTo,
    delta,
    steps = 20,
    duration = 500,
  }: {
    to?: HTMLElement | { x: number; y: number };
    delta?: { x: number; y: number };
    steps?: number;
    duration?: number;
  },
) {
  const from = getElementClientCenter(element);
  let to = { x: 0, y: 0 };
  if (delta) {
    to = {
      x: from.x + delta.x,
      y: from.y + delta.y,
    };
  } else if (inTo) {
    to = getCoords(inTo);
  } else throw new Error("You must provide either 'to' or 'delta'");

  const step = {
    x: (to.x - from.x) / steps,
    y: (to.y - from.y) / steps,
  };

  const current = {
    clientX: from.x,
    clientY: from.y,
  };

  Object.defineProperties(element, {
    hasPointerCapture: {
      value: jest.fn().mockReturnValue(true),
    },
    setPointerCapture: {
      value: jest.fn(),
    },
    releasePointerCapture: {
      value: jest.fn(),
    },
  });
  fireEvent.touchMove(element, current);
  fireEvent.touchStart(element, current);
  for (let i = 0; i < steps; i++) {
    current.clientX += step.x;
    current.clientY += step.y;
    await sleep(duration / steps);
    fireEvent.touchMove(element, current);
  }
  fireEvent.touchEnd(element, current);
}
