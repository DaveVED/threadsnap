"use server";

import { signIn, signOut } from "@threadsnap/auth";

import { api } from "~/trpc/server";

export async function handleSignOut() {
  await signOut();
  api.auth.signOut();
}
