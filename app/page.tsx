import Link from "next/link";

import SigninButton from "@/components/signin-button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SigninButton />
      <Link href="/public">go to Public route</Link>
      <Link href="/protected">go to Protected route</Link>
    </main>
  );
}
