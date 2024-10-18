"use client";

import { SubmissionResult, useForm } from "@conform-to/react";
import { createUser } from "./_lib/actions"; // Server Action
import { useFormState } from "react-dom";
import { parseWithZod } from "@conform-to/zod";
import { z } from "zod";

export const insertUserSchema = z.object({
  name: z.string().min(0),
  email: z.string().email(),
});
export default function UserForm() {
  const [lastResult, action] = useFormState<SubmissionResult, FormData>(
    createUser,
    {},
  );
  const [form, fields] = useForm<z.infer<typeof insertUserSchema>>({
    // Sync the result of last submission
    lastResult,
    defaultValue: {},
    // Reuse the validation logic on the client
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: insertUserSchema });
    },

    // Validate the form on blur event triggered
    shouldValidate: "onSubmit",
    shouldRevalidate: "onInput",
  });
  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
      <div>
        <label htmlFor={fields.name.id}>name</label>
        <input
          id={fields.name.id}
          type="name"
          key={fields.name.key}
          name={fields.name.name}
          defaultValue={fields.name.initialValue}
        />
        <div>{fields.name.errors}</div>
      </div>
      <div>
        <label htmlFor={fields.email.id}>email</label>
        <input
          id={fields.email.id}
          type="email"
          key={fields.email.key}
          name={fields.email.name}
          defaultValue={fields.email.initialValue}
        />
        <div>{fields.email.errors}</div>
      </div>
      <button type="submit">保存</button>
    </form>
  );
}
