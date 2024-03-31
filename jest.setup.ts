import "@testing-library/jest-dom";
import "./app/globals.css";
import { server } from "./test/msw";
import { toHaveNoViolations } from "jest-axe";

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
