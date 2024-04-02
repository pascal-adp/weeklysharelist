"use client"
import AvatarDropdown from "~/app/components/AvatarDropdown";
import { useUserInfo } from "~/app/services/queries";

const Navbar = () => {
  const { data, isLoading } = useUserInfo();

  return (  
    <nav className="flex h-16 w-screen items-center border-b-2 justify-between">
      <p className="ml-5 text-3xl font-bold tracking-[-0.1em] text-ws-mindaro cursor-default">
        weeklysharelist!
      </p>
      { isLoading ? <p>Loading....</p>
      : <AvatarDropdown userImage={data?.data.image} userName={data?.data.name} />  
    }
    </nav>
  );
};

export default Navbar;