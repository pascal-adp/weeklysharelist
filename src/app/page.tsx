import { Button } from "~/app/components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-col flex-grow mt-64 items-center">
      <div className="font-bold text-4xl tracking-[-0.08em] text-center">
        <p>music is meant to be <span className="text-ws-claret">share</span>d.</p>
        <p>your play<span className="text-ws-claret">list</span> with your favorite 3 songs.</p>
        <p>once a week!</p>
      </div>
      <Button className="bg-ws-darkcyan text-white w-32 text-md mt-4">Sign Up</Button>
    </main>
  );
}