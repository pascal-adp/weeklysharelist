"use client"
import { ListMusic, Users2 } from "lucide-react";
import { useState } from "react";
import AvatarDropdown from "~/components/AvatarDropdown";
import { useUserInfo } from "~/services/queries";

import Friends from "~/components/Friends";
import CreateSharelist from "~/components/sharelist/CreateSharelist";

const Navbar = () => {
  const { data, isLoading } = useUserInfo();

  const [friendsDialogOpen, setFriendsDialogOpen] = useState(false);
  const [sharelistDialogOpen, setSharelistDialogOpen] = useState(false);


  return (
    <nav className="flex h-16 w-screen items-center border-b-2 justify-between">
      <p className="ml-5 text-3xl font-bold tracking-[-0.1em] text-ws-darkcyan cursor-default">
        weeklysharelist!
      </p>
      <div className="flex flex-row">
        <button onClick={() => { setFriendsDialogOpen(!friendsDialogOpen)}} className="border-ws-darkcyan border-2 cursor-pointer w-10 h-10 mr-6 rounded-3xl flex justify-center items-center">
          <Users2 className="w-6 h-6"/>
        </button>
        <button onClick={() => { setSharelistDialogOpen(!sharelistDialogOpen)}} className="border-ws-darkcyan border-2 cursor-pointer w-10 h-10 mr-6 rounded-3xl flex justify-center items-center">
          <ListMusic className="w-6 h-6"/>
        </button>
        {isLoading ? <p>Loading....</p>
          : <AvatarDropdown userImage={data?.data.image} userName={data?.data.name} />
        }
      </div>
      <CreateSharelist dialogOpen={sharelistDialogOpen} updateDialogOpenState={setSharelistDialogOpen} />
      <Friends dialogOpen={friendsDialogOpen} updateDialogOpenState={setFriendsDialogOpen} />
    </nav>
  );
};

export default Navbar;