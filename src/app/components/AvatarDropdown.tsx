import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "~/app/components/ui/dropdown-menu"
  import { Avatar, AvatarImage, AvatarFallback } from "~/app/components/ui/avatar";
import React from "react";
import Friends from "./Friends";

const abbreviateUserName = (userName: UserDataAttirbutes): string => {
    if (!userName) {
        return "";
    }

    // Abbreviation is only necessary if the username is longer than 2 characters
    if (userName.length > 2) {
        userName = userName?.slice(0, 2);
    }

    return userName.toUpperCase();
}

type UserDataAttirbutes = string | null | undefined;

interface AvatarDropdownProps {
    userImage: UserDataAttirbutes;
    userName: UserDataAttirbutes;
}

const AvatarDropdown: React.FC<AvatarDropdownProps> = ({ userImage, userName }) => {

    return(
        <DropdownMenu>
        <DropdownMenuTrigger asChild >
          <Avatar className="mr-5 h-10 w-10 bg-gray-300 cursor-pointer">
            <AvatarImage src={userImage ? userImage : ""} />
            <AvatarFallback>{ abbreviateUserName(userName) }</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white">
          <DropdownMenuLabel>{userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>
            <Friends />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
}

export default AvatarDropdown