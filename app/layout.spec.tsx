import { renderToString } from "react-dom/server";
import RootLayout from "./layout";

describe("RootLayout", () => {
  it("正しくレンダリングされる", () => {
    const container = renderToString(<RootLayout>hello</RootLayout>);
    expect(container).toMatchInlineSnapshot(
      `"<html lang="ja"><head></head><body>hello</body></html>"`,
    );
  });
});
