import "@testing-library/jest-dom";
import { toHaveNoViolations } from "jest-axe";
import "./app/globals.css";
import { server } from "./test/msw";

expect.extend(toHaveNoViolations);

const lastResult = {};
jest.mock("react-dom", () => {
  return {
    ...jest.requireActual("react-dom"),
    useFormState: (cb: () => void) => [lastResult, jest.fn(cb)],
  };
});

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
  jest.useRealTimers();
});
afterAll(() => {
  server.close();
});
// const {
//   implementation,
// } = require("jsdom/lib/jsdom/living/nodes/HTMLFormElement-impl");
// Object.defineProperty(implementation.prototype, "requestSubmit", {
//   value() {
//     this.dispatchEvent(new Event("submit"));
//   },
// });
