import "@testing-library/jest-dom";
import "./app/globals.css";
import { server } from "./test/msw";

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
