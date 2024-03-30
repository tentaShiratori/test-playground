import "@testing-library/jest-dom";
import { server } from "./test/msw";
import "./app/globals.css";

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
