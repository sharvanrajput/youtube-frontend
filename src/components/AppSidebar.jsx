import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator
} from "@/components/ui/sidebar";

import { BiSolidLike } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { MdList, MdOutlineHistory, MdSubscriptions } from "react-icons/md";
import { PiVideoBold } from "react-icons/pi";
import { SiYoutubeshorts } from "react-icons/si";

import logo from "../assets/favicon.png";
import { Link } from "react-router-dom";

// Menu items
const items = [
  {
    title: "Home",
    url: "/",
    icon: <FaHome />,
  },
  {
    title: "Shorts",
    url: "/shorts",
    icon: <SiYoutubeshorts />,
  },
  {
    title: "Subscription",
    url: "/subscription",
    icon: <MdSubscriptions />,
  },
];

// Menu items 2
const items2 = [
  {
    title: "History",
    url: "/history",
    icon: <MdOutlineHistory />,
  },
  {
    title: "Playlist",
    url: "/playlist",
    icon: <MdList />,
  },
  {
    title: "Saved videos",
    url: "/saved",
    icon: <PiVideoBold />,
  },
  {
    title: "Liked videos",
    url: "/liked",
    icon: <BiSolidLike />,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="z-0 absolute" collapsible="icon">
      <SidebarContent className="bg-background">

        {/* LOGO SECTION */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem className="mt-1">
                <SidebarMenuButton asChild>
                  <Link to="/">
                    <img src={logo} className="w-[30px]" alt="logo" />
                    <span className="font-bold">Youtube</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>

            {/* FIRST MENU LIST */}
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="mt-1">
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <SidebarSeparator />
            <SidebarGroupLabel>You</SidebarGroupLabel>
            <SidebarMenu>
              {items2.map((item) => (
                <SidebarMenuItem key={item.title} className="mb-1">
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>


        {/* SECOND MENU LIST */}
        

      </SidebarContent>
    </Sidebar>
  );
}
