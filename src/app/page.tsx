"use client"
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";
import { useSessionStatus } from "~/services/queries";

export default function Home() {
  const router = useRouter();

  const sessionStatus = useSessionStatus();

  return (
    <main className="mt-64 flex flex-grow flex-col items-center">
      <div className="text-center text-4xl font-bold tracking-[-0.08em]">
        <p>
          music is meant to be shared.
        </p>
        <p>
          your playlist with your
          favorite 3 songs.
        </p>
        <p>once a week!</p>
      </div>
      <Button
        onClick={() => {
          router.push('http://localhost:8000/api/v1/auth/spotify/login')
        }}
        className="text-md mt-4 w-32 bg-ws-darkcyan text-white"
      >
        Sign Up
      </Button>
    </main>
  );
}
