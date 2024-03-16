import { fc, it } from "@fast-check/jest";
import { RenderOptions, cleanup, render } from "@testing-library/react";
import { ReactNode } from "react";
import { FizzBuzz } from "./Sample3";

it.prop([fc.float()])("3の倍数を渡すとFizzが表示される", (value) => {
  fc.pre(value % 3 === 0 && value % 5 !== 0);
  const result = renderFC(<FizzBuzz value={value} />);
  expect(result.getByText("Fizz")).toBeInTheDocument();
});

it.prop([fc.float()])("5の倍数を渡すとBuzzが表示される", (value) => {
  fc.pre(value % 3 !== 0 && value % 5 === 0);
  const result = renderFC(<FizzBuzz value={value} />);
  expect(result.getByText("Buzz")).toBeInTheDocument();
});

it.prop([fc.float()])("15の倍数を渡すとFizzBuzzが表示される", (value) => {
  fc.pre(value % 15 === 0);
  const result = renderFC(<FizzBuzz value={value} />);
  expect(result.getByText("FizzBuzz")).toBeInTheDocument();
});

it.prop([fc.float()])("3と5に素な数字を渡すとその数字が表示される", (value) => {
  fc.pre(value % 3 !== 0 && value % 5 !== 0);
  const result = renderFC(<FizzBuzz value={value} />);
  expect(result.getByText(value)).toBeInTheDocument();
});

const renderFC = (ui: ReactNode, options: RenderOptions = {}) => {
  return render(ui, {
    container: document.body.appendChild(document.createElement("div")),
    ...options,
  });
};
