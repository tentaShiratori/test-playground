import { fc, it } from "@fast-check/jest";
import {
  RenderOptions,
  RenderResult,
  render,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReactNode } from "react";
import { Form } from "./Sample4";

it.prop([fc.gen(), fc.integer({ min: 1, max: 2 ** 3 - 1 })])(
  "1つでもエラーがあればエラーが表示される",
  async (gen, comb) => {
    let c = comb;
    const result = renderFC(<Form />);
    const password = gen(properString, 8, 20);
    await [() => inputName(result, gen), () => inputInvalidName()][c % 2]();
    c = c >> 1;
    await [
      () => inputPassword(result, gen, password),
      () => inputInvalidPassword(),
    ][c % 2]();
    c = c >> 1;
    await [
      () => inputPasswordConfirm(result, gen, password),
      () => inputInvalidPasswordConfirm(),
    ][c % 2]();
    await clickButtonA(result);
    expect(result.getByText("エラーがあります")).toBeInTheDocument();
  },
);

it.prop([fc.gen()])("すべてにエラーがないならエラーはない", async (gen) => {
  const result = renderFC(<Form />);
  const password = gen(properString, 8, 20);
  await inputName(result, gen);
  await inputPassword(result, gen, password);
  await inputPasswordConfirm(result, gen, password);
  await clickButtonA(result);
  expect(within(result.container).getByTestId("error")).toBeEmptyDOMElement();
});

const renderFC = (ui: ReactNode, options: RenderOptions = {}) => {
  return render(ui, {
    container: document.body.appendChild(document.createElement("div")),
    ...options,
  });
};

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
async function inputName(result: RenderResult, gen: fc.GeneratorValue) {
  await userEvent.type(
    result.getByRole("textbox", { name: "Name" }),
    gen(filteredStrings, 1, 100, /^[a-zA-Z\d]/),
  );
}

async function inputPassword(
  result: RenderResult,
  gen: fc.GeneratorValue,
  password?: string,
) {
  await userEvent.type(
    result.getByLabelText("Password"),
    password ?? gen(properString, 8, 20),
  );
}

async function inputPasswordConfirm(
  result: RenderResult,
  gen: fc.GeneratorValue,
  password?: string,
) {
  await userEvent.type(
    result.getByLabelText("Password Confirmation"),
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

async function clickButtonA(result: RenderResult) {
  await userEvent.click(result.getByRole("button"));
}
