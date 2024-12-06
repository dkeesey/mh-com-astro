import * as React from "react"
import { Menu } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@components/ui/sheet"

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

const NavLinks = () => (
  <>
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
  </>
)

const MobileNav = () => (
  <Sheet>
    <SheetTrigger className="md:hidden">
      <Menu className="h-6 w-6" />
      <span className="sr-only">Toggle menu</span>
    </SheetTrigger>
    <SheetContent side="right" className="w-[80%] sm:w-[350px] pt-12">
      <nav className="flex flex-col gap-6">
        {navData.map((item) => (
          <a
            key={item.path}
            href={item.path}
            className="block px-2 py-1 text-lg font-robotoCondensed text-gray-900 hover:text-black transition-colors"
          >
            {item.name}
          </a>
        ))}
      </nav>
    </SheetContent>
  </Sheet>
)

export function NavMenu() {
  return (
    <div className="flex justify-between items-center py-4 mx-auto w-full max-w-[1440px]">
      <div className="logo ml-6 md:ml-24">
        <a href="/" className="text-xl" aria-label="Go home">
          MASUMI HAYASHI
        </a>
      </div>
      
      {/* Mobile hamburger menu */}
      <div className="mr-6 md:hidden">
        <MobileNav />
      </div>

      {/* Desktop navigation */}
      <NavigationMenu className="hidden md:block mr-24">
        <NavigationMenuList>
          <NavLinks />
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
