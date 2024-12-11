import * as React from "react"
import { Menu } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@components/ui/sheet"
import { cn } from "@lib/utils"

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

const NavLinks = () => {
  const [pathname, setPathname] = React.useState("");

  React.useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  return (
    <>
      {navData.map((item) => (
        <NavigationMenuItem key={item.path} className="px-4">
          {pathname === item.path ? (
            <span className="text-sm md:text-base text-black italic">
              {item.name}
            </span>
          ) : (
            <a
              href={item.path}
              className="text-sm md:text-base text-black no-underline hover:underline transition-colors [&]:text-black [&:hover]:text-black"
            >
              {item.name}
            </a>
          )}
        </NavigationMenuItem>
      ))}
    </>
  );
}

const MobileNav = () => {
  const [pathname, setPathname] = React.useState("");

  React.useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  return (
    <Sheet>
      <SheetTrigger className="md:hidden">
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle menu</span>
      </SheetTrigger>
      <SheetContent side="right" className="w-[80%] sm:w-[350px] pt-12">
        <nav className="flex flex-col gap-6">
          {navData.map((item) => (
            <div key={item.path}>
              {pathname === item.path ? (
                <span className="block px-2 py-1 text-lg font-robotoCondensed text-black italic">
                  {item.name}
                </span>
              ) : (
                <a
                  href={item.path}
                  className="block px-2 py-1 text-lg font-robotoCondensed text-black no-underline hover:underline transition-colors [&]:text-black [&:hover]:text-black"
                >
                  {item.name}
                </a>
              )}
            </div>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export function NavMenu() {
  return (
    <div className="flex justify-between items-center py-4 mx-auto w-full max-w-[1440px]">
      <div className="logo ml-6 md:ml-24">
        <a href="/" className="text-xl text-black no-underline hover:underline [&]:text-black [&:hover]:text-black" aria-label="Go home">
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
