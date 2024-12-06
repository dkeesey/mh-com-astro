import * as React from "react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@components/ui/navigation-menu"

const navData = [
  {
    name: "Internment Camps Gallery",
    path: "/artwork/internment-camps/",
  },
  {
    name: "Family Album",
    path: "/family-album-project/",
  },
  {
    name: "Artist Statement",
    path: "/artist-statement/",
  },
  {
    name: "About",
    path: "/about/",
  },
]

export function NavMenu() {
  return (
    <NavigationMenu className="flex justify-between items-center py-4 mx-auto w-full max-w-[1440px]" aria-label="Primary">
      <div className="logo ml-6 md:ml-24">
        <a href="/" className="text-xl" aria-label="Go home">
          MASUMI HAYASHI
        </a>
      </div>
      <NavigationMenuList className="mr-2 md:mr-24">
        {navData.map((item) => (
          <NavigationMenuItem key={item.path}>
            <NavigationMenuLink
              href={item.path}
              className={navigationMenuTriggerStyle() + " text-sm md:text-base"}
            >
              {item.name}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
