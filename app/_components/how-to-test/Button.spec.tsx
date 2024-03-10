import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

it("ボタンを押すとイベントリスナーが発火する", async () => {
	const handleClick = jest.fn();
	render(<Button onClick={handleClick}>ボタンだよ</Button>);

	await userEvent.click(screen.getByRole("button"));

	expect(handleClick).toHaveBeenCalled();
});
