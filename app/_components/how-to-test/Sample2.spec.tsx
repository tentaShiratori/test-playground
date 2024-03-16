import { server } from "@/test/msw";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { Sample } from "./Sample2";

describe("Sample", () => {
  describe("初期描画時", () => {
    it("APIが呼び出される", async () => {
      jest.useFakeTimers();
      const getRequest = jest.fn();
      server.use(
        http.get("/todos", ({ request }) => {
          getRequest(request.url);
          return HttpResponse.json([{ title: "hoge" }]);
        }),
      );
      render(<Sample />);
      jest.advanceTimersByTime(1000);
      await act(() => Promise.resolve());
      expect(getRequest).toHaveBeenCalledTimes(1);
      expect(getRequest).toHaveBeenNthCalledWith(1, "http://localhost/todos");
    });
    describe("API呼び出し成功時", () => {
      it("ToDoが表示される", async () => {
        jest.useFakeTimers();
        server.use(
          http.get("/todos", () => {
            return HttpResponse.json([{ title: "hoge" }, { title: "huga" }]);
          }),
        );
        render(<Sample />);
        jest.advanceTimersByTime(1000);
        await act(() => Promise.resolve());
        expect(screen.getByText("hoge")).toBeInTheDocument();
        expect(screen.getByText("huga")).toBeInTheDocument();
      });
    });
    describe("API呼び出し失敗時", () => {
      it("ToDoが表示されない", async () => {
        jest.useFakeTimers();
        server.use(
          http.get("/todos", () => {
            return HttpResponse.error();
          }),
        );
        render(<Sample />);
        jest.advanceTimersByTime(1000);
        await act(() => Promise.resolve());
        expect(screen.getByRole("list")).toBeEmptyDOMElement();
      });
    });
  });
  describe("検索時", () => {
    it("APIが呼び出される", async () => {
      jest.useFakeTimers({ advanceTimers: true });
      const getRequest = jest.fn();
      server.use(
        http.get("/todos", ({ request }) => {
          getRequest(request.url);
          return HttpResponse.json([{ title: "hoge" }]);
        }),
      );
      render(<Sample />);
      jest.advanceTimersByTime(1000);
      await inputIntoSearch("hoge");
      jest.advanceTimersByTime(1000);
      await act(() => Promise.resolve());
      expect(getRequest).toHaveBeenCalledTimes(2);
      expect(getRequest).toHaveBeenNthCalledWith(
        2,
        "http://localhost/todos?s=hoge",
      );
    });
    describe("API呼び出し成功時", () => {
      it("ToDoが更新される", async () => {
        jest.useFakeTimers({ advanceTimers: true });
        let callCount = 0;
        server.use(
          http.get("/todos", () => {
            if (callCount >= 1) {
              return HttpResponse.json([{ title: "foo" }, { title: "bar" }]);
            }
            callCount++;
            return HttpResponse.json([{ title: "hoge" }]);
          }),
        );
        render(<Sample />);
        jest.advanceTimersByTime(1000);
        await inputIntoSearch("hoge");
        jest.advanceTimersByTime(1000);
        await act(() => Promise.resolve());
        expect(screen.getByText("foo")).toBeInTheDocument();
        expect(screen.getByText("bar")).toBeInTheDocument();
      });
    });
    describe("API呼び出し失敗時", () => {
      it("ToDOがなくなる", async () => {
        jest.useFakeTimers({ advanceTimers: true });
        let callCount = 0;
        server.use(
          http.get("/todos", () => {
            if (callCount >= 1) {
              return HttpResponse.error();
            }
            callCount++;
            return HttpResponse.json([{ title: "hoge" }]);
          }),
        );
        render(<Sample />);
        jest.advanceTimersByTime(1000);
        await inputIntoSearch("hoge");
        jest.advanceTimersByTime(1000);
        await act(() => Promise.resolve());
        expect(screen.getByRole("list")).toBeEmptyDOMElement();
      });
    });
  });
});

async function inputIntoSearch(input: string) {
  await userEvent.type(screen.getByRole("textbox"), input);
}
