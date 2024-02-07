"use client"
import { Button } from "~/app/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import CreateSharelist from "~/app/components/CreateSharelist";
import { api } from "~/trpc/react";

export default function Home() {
  const session = useSession()
  const [userId, setUserId] = useState("")
  const createSharelist = api.sharelist.create.useMutation()

  useEffect(() => {
    console.log(session)
  }, [session])

  return (
    <main className="mt-64 flex flex-grow flex-col items-center">
      <div className="text-center text-4xl font-bold tracking-[-0.08em]">
        <p>
          music is meant to be <span className="text-ws-claret">share</span>d.
        </p>
        <p>
          your play<span className="text-ws-claret">list</span> with your
          favorite 3 songs.
        </p>
        <p>once a week!</p>
      </div>
      <Button
        onClick={() => {
          const signInUser = async () => {
            try {
              await signIn("spotify");
            } catch (error) {
              console.error(error);
            }
          };
          signInUser().catch(console.error);
        }}
        className="text-md mt-4 w-32 bg-ws-darkcyan text-white"
      >
        Sign Up
      </Button>
      <Button onClick={() => {
        console.log(`Logging the user id: ${userId}`)
        const result = createSharelist.mutate()
        console.log(result)
      }}>
        CREATE SHARELIST
      </Button>
      <CreateSharelist />
    </main>
  );
}
