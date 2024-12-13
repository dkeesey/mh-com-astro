import * as React from "react"
import HamburgerMenuIcon from "../HamburgerMenuIcon"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@radix-ui/react-navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@components/ui/sheet"

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
              className="text-sm md:text-base no-underline transition-colors duration-500 hover:text-primary-bg-primary/50"
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
          className="group flex h-10 w-10 items-center justify-center rounded-full border-primary-bg-primary bg-primary-text-primary transition-all duration-500 hover:border-primary-bg-primary/50 hover:bg-primary-bg-primary/50 focus:border-primary-bg-primary/50 focus:bg-primary-bg-primary/50 focus:outline-none"
          aria-label="Toggle menu"
        >
          <HamburgerMenuIcon className="text-primary-bg-primary/80 transition-colors duration-500 group-hover:text-primary-text-primary group-focus:text-primary-text-primary" />
        </button>
      </SheetTrigger>
      <SheetContent 
        side="right"
        className="w-[80%] bg-primary-text-primary text-black border-l border-primary-text-primary data-[state=open]:animate-slide-in-right data-[state=closed]:animate-slide-out-right"
      >
        <nav className="flex flex-col gap-4 p-6 font-roboto-condensed">
          {navData.map((item) => (
            <div key={item.path}>
              {pathname === item.path ? (
                <span className="text-lg italic text-black">
                  {item.name}
                </span>
              ) : (
                <a
                  href={item.path}
                  className="text-lg text-black/80 no-underline transition-colors duration-500 hover:text-black/60"
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
        <NavigationMenuList className="flex flex-row gap-4">
          <NavLinks />
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
