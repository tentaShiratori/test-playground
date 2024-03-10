import { render, screen } from "@testing-library/react";
import { FizzBuzz } from "./Sample3";

it.each([
	[3, "Fizz"],
	[6, "Fizz"],
	[5, "Buzz"],
	[10, "Buzz"],
	[15, "FizzBuzz"],
	[2, "2"],
	[8, "8"],
])("%iを渡すと%sを表示する", (value, expected) => {
	render(<FizzBuzz value={value} />);
	expect(screen.getByText(expected)).toBeInTheDocument();
});
