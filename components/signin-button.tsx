import {auth, signIn, signOut} from "@/auth/auth";

export default async function SigninButton() {
  const session = await auth();

  return (
    <>
      {session !== null ? (
        <form
          action={async () => {
            "use server";
            await signOut({redirectTo: "/"});
          }}
        >
          <button>Log Out</button>
        </form>
      ) : (
        <form
          action={async () => {
            "use server";
            await signIn();
          }}
        >
          <button>Sign in</button>
        </form>
      )}
    </>
  );
}
