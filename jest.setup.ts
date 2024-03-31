import "@testing-library/jest-dom";
import { toHaveNoViolations } from "jest-axe";
import "./app/globals.css";
import { server } from "./test/msw";

expect.extend(toHaveNoViolations);

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
