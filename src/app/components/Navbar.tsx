import { useSession } from "next-auth/react";
import { Avatar, AvatarImage, AvatarFallback } from "~/app/components/ui/avatar";

const Navbar = () => {
  const { data } = useSession()

  return (
    <nav className="flex h-16 w-screen items-center border-b-2 justify-between">
      <p className="ml-5 text-3xl font-bold tracking-[-0.1em] text-ws-claret">
        weeklysharelist!
      </p>
      <Avatar className="mr-5 h-10 w-10 bg-gray-300">
        <AvatarImage src=""/>
        <AvatarFallback>PA</AvatarFallback>
      </Avatar>
    </nav>
  );
};

export default Navbar;