"use server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { SubmissionResult } from "@conform-to/react";
import "server-only";

export async function createUser(
  _: SubmissionResult,
  formData: FormData,
): Promise<SubmissionResult> {
  const values = Object.fromEntries(formData.entries()) as Record<
    string,
    string
  >;
  await db.insert(users).values({
    name: values.name,
    email: values.email,
  });

  return { status: "success" };
}
