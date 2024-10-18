import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UserForm from "./page"; // テスト対象のコンポーネント
import { createUser } from "./_lib/actions"; // モックするServer Action
import userEvent from "@testing-library/user-event";

jest.mock("./_lib/actions", () => ({
  createUser: jest.fn(),
}));
describe("UserForm", () => {
  it("renders form with name and email inputs", () => {
    render(<UserForm />);

    // 名前とメールアドレスの入力フォームが存在するか確認
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByText("保存");

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("submits form successfully", async () => {
    render(<UserForm />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByText("保存");

    // 名前とメールを入力
    await userEvent.type(nameInput, "Test User");
    await userEvent.type(emailInput, "test@example.com");

    // フォーム送信
    await userEvent.click(submitButton);

    await waitFor(() => {
      // Server Actionが呼び出されることを確認
      expect(createUser).toHaveBeenNthCalledWith(1, expect.any(FormData));
    });
  });
});
