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
    name: "Historical Documents",
    path: "/historical-documents/",
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
            <span className="text-sm md:text-base italic">
              {item.name}
            </span>
          ) : (
            <a
              href={item.path}
              className="text-sm md:text-base no-underline"
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
      <SheetTrigger asChild>
        <button
          className="group flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white"
          aria-label="Toggle menu"
        >
          <Menu className="h-4 w-4" />
        </button>
      </SheetTrigger>
      <SheetContent className="w-full">
        <nav className="flex flex-col gap-4">
          {navData.map((item) => (
            <div key={item.path}>
              {pathname === item.path ? (
                <span className="text-base italic">
                  {item.name}
                </span>
              ) : (
                <a
                  href={item.path}
                  className="text-base no-underline"
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
  const [pathname, setPathname] = React.useState("");

  React.useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  return (
    <div className="flex justify-between items-center py-4 mx-auto w-full max-w-[1440px]">
      <div className="logo ml-6 md:ml-24 md:pr-6">
        {pathname === "/" ? (
          <span className="text-xl italic">
            MASUMI HAYASHI
          </span>
        ) : (
          <a href="/" className="text-xl no-underline" aria-label="Go home">
            MASUMI HAYASHI
          </a>
        )}
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
