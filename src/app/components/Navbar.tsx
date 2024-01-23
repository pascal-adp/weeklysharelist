"use client"
import { useSession } from "next-auth/react";
import AvatarDropdown from "~/app/components/AvatarDropdown";

const Navbar = () => {
  const { data } = useSession()

  return (
    <nav className="flex h-16 w-screen items-center border-b-2 justify-between">
      <p className="ml-5 text-3xl font-bold tracking-[-0.1em] text-ws-claret">
        weeklysharelist!
      </p>
      <AvatarDropdown userImage={data?.user.image} userName={data?.user.name} />
    </nav>
  );
};

export default Navbar;