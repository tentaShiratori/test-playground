import { fc, it } from "@fast-check/jest";
import {
	act,
	cleanup,
	fireEvent,
	render,
	screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Form } from "./Sample4";

it.prop([fc.gen(), fc.integer({ min: 1, max: 2 ** 3 - 1 })])(
	"1つでもエラーがあればエラーが表示される",
	async (gen, comb) => {
		let c = comb;
		cleanup();
		render(<Form />);
		const password = gen(properString, 8, 20);
		await [() => inputName(gen), () => inputInvalidName()][c % 2]();
		c = c >> 1;
		await [() => inputPassword(gen, password), () => inputInvalidPassword()][
			c % 2
		]();
		c = c >> 1;
		await [
			() => inputPasswordConfirm(gen, password),
			() => inputInvalidPasswordConfirm(),
		][c % 2]();
		await clickButton();
		expect(screen.getByText("エラーがあります")).toBeInTheDocument();
	},
);

it.prop([fc.gen()])("すべてにエラーがないならエラーはない", async (gen) => {
	cleanup();
	render(<Form />);
	const password = gen(properString, 8, 20);
	await inputName(gen);
	await inputPassword(gen, password);
	await inputPasswordConfirm(gen, password);
	await clickButton();
	expect(screen.getByTestId("error")).toBeEmptyDOMElement();
});

const char = (charCodeFrom: number, charCodeTo: number) =>
	fc.integer({ min: charCodeFrom, max: charCodeTo }).map(String.fromCharCode);
const filteredStrings = (min: number, max: number, filter: RegExp) => {
	return fc
		.array(
			char(
				33, //'!'
				126, //'~'
			).filter((c) => filter.test(c)),
			{ minLength: min, maxLength: max },
		)
		.map((arr) => arr.join(""));
};
const properString = (min: number, max: number) => {
	return filteredStrings(min, max, /^[a-zA-Z\d]$/).filter((s) => {
		return (
			!new RegExp(`^[\\d]{${min},${max}}`).test(s) &&
			!new RegExp(`^[a-zA-Z]{${min},${max}}`).test(s)
		);
	});
};

async function inputName(gen: fc.GeneratorValue) {
	await userEvent.type(
		screen.getByRole("textbox", { name: "Name" }),
		gen(filteredStrings, 1, 100, /^[a-zA-Z\d]/),
	);
}

async function inputPassword(gen: fc.GeneratorValue, password?: string) {
	await userEvent.type(
		screen.getByLabelText("Password"),
		password ?? gen(properString, 8, 20),
	);
}

async function inputPasswordConfirm(gen: fc.GeneratorValue, password?: string) {
	await userEvent.type(
		screen.getByLabelText("Password Confirmation"),
		password ?? gen(properString, 8, 20),
	);
}

async function inputInvalidName() {
	// 何も入力しない
}

async function inputInvalidPassword() {
	// 何も入力しない
}

async function inputInvalidPasswordConfirm() {
	// 何も入力しない
}

async function clickButton() {
	await userEvent.click(screen.getByRole("button"));
}
