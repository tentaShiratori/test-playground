import RootLayout from "./layout";
import { renderToString } from "react-dom/server";

describe("RootLayout", () => {
  it("正しくレンダリングされる", () => {
    const container = renderToString(<RootLayout>hello</RootLayout>);
    expect(container).toMatchInlineSnapshot(
      `"<html lang="ja"><body>hello</body></html>"`
    );
  });
});
