"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import zod from "zod";
const schema = zod
	.object({
		name: zod.string().min(1),
		password: zod
			.string()
			.min(8, "パスワードは8文字以上で入力してください")
			.regex(
				/^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i,
				"パスワードは半角英数字混合で入力してください",
			),
		passwordConfirm: zod.string().min(1),
	})
	.superRefine(({ password, passwordConfirm }, ctx) => {
		if (password !== passwordConfirm) {
			ctx.addIssue({
				path: ["passwordConfirm"],
				code: "custom",
				message: "パスワードが一致しません",
			});
		}
	});

export const Form: FC = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({ resolver: zodResolver(schema) });
	return (
		<form onSubmit={handleSubmit(() => void 0)}>
			<label>
				Name
				<input type="text" {...register("name")} />
			</label>
			<label>
				Password
				<input type="password" {...register("password")} />
			</label>
			<label>
				Password Confirmation
				<input type="password" {...register("passwordConfirm")} />
			</label>
			<button type="submit">送信</button>
			<div data-testid="error">
				{Object.keys(errors).length > 0 && "エラーがあります"}
			</div>
		</form>
	);
};
