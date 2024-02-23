"use client"
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AvatarDropdown from "~/app/components/AvatarDropdown";

type UserInfo = {
  name: string;
  image: string;
}

const Navbar = () => {
  const { data } = useQuery({
    queryKey: ["userInfo"],
    queryFn: async () => {
      return await axios.get<UserInfo>("http://localhost:8000/api/v1/user/info", { withCredentials: true });
    },
  })

  return (
    <nav className="flex h-16 w-screen items-center border-b-2 justify-between">
      <p className="ml-5 text-3xl font-bold tracking-[-0.1em] text-ws-claret">
        weeklysharelist!
      </p>
      <AvatarDropdown userImage={data?.data.image} userName={data?.data.name} />
    </nav>
  );
};

export default Navbar;