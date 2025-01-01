"use server";

import { signIn, signOut } from "@acme/auth";

import { api } from "~/trpc/server";

export async function handleSignOut() {
  await signOut();
  api.auth.signOut();
}
