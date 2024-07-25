"use client";

import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/hooks/useAuth";
import { useMediaQuery } from "@/hooks/useMediaQuery";

function UserButton() {
  const { user, signOutUser } = useAuthStore();
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant={isMobile ? "outline" : "ghost"}
          className="underline  underline-offset-2 flex gap-2 items-center"
        >
          {user?.firstName} <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="top"
        align={isMobile ? "start" : "end"}
        sideOffset={24}
        className="w-60 bg-[#0c0b09] rounded-none"
      >
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="rounded-none" asChild>
            <Link
              href="/profile"
              className="hover:bg-neutral-700/50 rounded-none"
            >
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-neutral-700/50 rounded-none">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={signOutUser}
          className="hover:bg-neutral-700/50 rounded-none"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserButton;
