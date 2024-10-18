"use client";

import { SubmissionResult, useForm } from "@conform-to/react";
import { createUser } from "./_lib/actions"; // Server Action
import { useFormState } from "react-dom";
import { z } from "zod";

export const insertUserSchema = z.object({
  name: z.string().min(0),
  email: z.string().email(),
});
export default function UserForm() {
  return (
    <form action={createUser} noValidate>
      <div>
        <label htmlFor={"name"}>name</label>
        <input id={"name"} type="name" />
      </div>
      <div>
        <label htmlFor={"email"}>email</label>
        <input id={"email"} type="email" />
      </div>
      <button type="submit">保存</button>
    </form>
  );
}
