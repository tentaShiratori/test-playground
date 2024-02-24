import { fc, it } from "@fast-check/jest";
import { cleanup, render, screen } from "@testing-library/react";
import { FizzBuzz } from "./Sample3";

it.prop([fc.float()])("3の倍数を渡すとFizzが表示される", (value) => {
	cleanup();
	fc.pre(value % 3 === 0 && value % 5 !== 0);
	render(<FizzBuzz value={value} />);
	expect(screen.getByText("Fizz")).toBeInTheDocument();
});

it.prop([fc.float()])("5の倍数を渡すとBuzzが表示される", (value) => {
	cleanup();
	fc.pre(value % 3 !== 0 && value % 5 === 0);
	render(<FizzBuzz value={value} />);
	expect(screen.getByText("Buzz")).toBeInTheDocument();
});

it.prop([fc.float()])("15の倍数を渡すとFizzBuzzが表示される", (value) => {
	cleanup();
	fc.pre(value % 15 === 0);
	render(<FizzBuzz value={value} />);
	expect(screen.getByText("FizzBuzz")).toBeInTheDocument();
});

it.prop([fc.float()])("3と5に素な数字を渡すとその数字が表示される", (value) => {
	cleanup();
	fc.pre(value % 3 !== 0 && value % 5 !== 0);
	render(<FizzBuzz value={value} />);
	expect(screen.getByText(value)).toBeInTheDocument();
});
