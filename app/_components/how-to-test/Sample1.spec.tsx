import { renderApp } from "@/test/renderApp";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FC, useContext } from "react";
import { Context, Counter, Provider } from "./Sample1";

const Test: FC = () => {
	const [counter] = useContext(Context);
	return (
		<>
			<Counter>ボタンだよ</Counter>
			<div>result: {counter}</div>
		</>
	);
};

it("ボタンを押すとカウントが進む", async () => {
	renderApp(<Test />, {
		wrapper: Provider,
	});

	expect(screen.getByText("result: 0")).toBeInTheDocument();

	await userEvent.click(screen.getByRole("button"));

	expect(screen.getByText("result: 1")).toBeInTheDocument();

	await userEvent.click(screen.getByRole("button"));

	expect(screen.getByText("result: 2")).toBeInTheDocument();
});
