'use server'

import { signOut } from "@acme/auth";

export async function handleSignOut() {
  await signOut();
}