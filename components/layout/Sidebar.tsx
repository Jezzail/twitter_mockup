import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

import { DotsHorizontalIcon, HomeIcon } from "@heroicons/react/solid";
import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardListIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
} from "@heroicons/react/outline";
import SidebarLink from "./SidebarLink";

const Sidebar = () => {
  const { data: session } = useSession();

  return (
    <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full">
      <div className="flex items-center justify-center w-14 h-14 hoverAnimation p-0 xl:ml-24">
        <Image src="/twitter-icon.jpg" alt="twitter" width={30} height={30} />
      </div>
      <div className="space-y-2.5 mt-4 mb-2.5 xl:ml-24">
        <SidebarLink text="Home" Icon={HomeIcon} active />
        <SidebarLink text="Explore" Icon={HashtagIcon} />
        <SidebarLink text="Notifications" Icon={BellIcon} />
        <SidebarLink text="Messages" Icon={InboxIcon} />
        <SidebarLink text="Bookmarks" Icon={BookmarkIcon} />
        <SidebarLink text="Lists" Icon={ClipboardListIcon} />
        <SidebarLink text="Profile" Icon={UserIcon} />
        <SidebarLink text="More" Icon={DotsCircleHorizontalIcon} />
      </div>
      <button className="hidden xl:inline ml-auto bg-twitter-blue text-white rounded-full w-56 h-[52px] text-lg font-bold shadow-md hover:bg-twitter-navy">
        Tweet
      </button>
      {session && (
        <div
          className="flex text-twitter-white items-center justify-center hoverAnimation xl:ml-auto xl:-mr-5 mt-auto"
          onClick={() => signOut()}
        >
          <img
            src={session.user.image || "/generic.jpg"}
            alt=""
            className="h-10 w-10 rounded-full xl:mr-2.5"
          ></img>
          <div className="hidden xl:inline leading-5">
            <h4 className="font-bold">{session.user.name}</h4>
            <p className="text-[#6e767d]">@{session.user.tag}</p>
          </div>
          <DotsHorizontalIcon className="h-5 hidden xl:inline ml-10" />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
