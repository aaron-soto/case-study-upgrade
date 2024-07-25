"use client";

import { Coffee, Contact, Home, Menu, SquareMenu } from "lucide-react";
import { NavButton, NavLink } from "@/components/navbar/nav-utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuthListener, useAuthStore } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import CartButton from "@/components/navbar/cart-button";
import Image from "next/image";
import Link from "next/link";
import { Oswald } from "next/font/google";
import TopBar from "@/components/navbar/top-bar";
import UserButton from "@/components/navbar/user-button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSiteSettingsStore } from "@/stores/SiteSettings";

const oswald = Oswald({ subsets: ["latin"] });

const Navbar = () => {
  useAuthListener();
  const { fetchSiteSettings } = useSiteSettingsStore();

  const { user } = useAuthStore();
  const router = useRouter();
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 0) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    fetchSiteSettings();
  }, []);

  const slideInVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i = 0) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: i * 0.2,
      },
    }),
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <>
      <div
        className={cn(
          "fixed top-0 navbar left-0 right-0 z-50 transition-transform duration-200",
          isHidden ? "-translate-y-[40px]" : "translate-y-0"
        )}
      >
        <TopBar />
      </div>
      <div
        className={cn(
          "fixed top-[40px] navbar left-0 right-0 z-40 py-4 px-0 backdrop-blur-lg bg-black/80 h-[60px] transition-transform duration-200",
          isHidden ? "-translate-y-[40px]" : "translate-y-0"
        )}
      >
        <div className="container mx-auto flex items-center justify-between h-full">
          <Link href="/">
            <h1 className={cn("text-xl tracking-wide", oswald.className)}>
              Case Study Coffee Lounge
            </h1>
          </Link>
          <div className="flex md:hidden">
            <Sheet modal={false} open={isOpen} onOpenChange={handleOpenChange}>
              <SheetTrigger asChild>
                <Button variant="ghost" className="relative ml-4 aspect-square">
                  <Menu className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="py-8 px-2.5 min-w-[350px] w-full max-w-[70vw]"
                autoFocus={false}
              >
                <nav className="flex flex-col justify-between h-full">
                  <div className="flex flex-col gap-4 mt-4 space-y-4">
                    <motion.div
                      variants={slideInVariants}
                      initial="hidden"
                      animate="visible"
                      custom={0}
                    >
                      <Image
                        src="/images/logos/color-logo-left.svg"
                        width={100}
                        height={100}
                        alt="Case Study Logo"
                        className="ml-4 mb-4"
                      ></Image>
                    </motion.div>
                    <motion.div
                      variants={slideInVariants}
                      initial="hidden"
                      animate="visible"
                      custom={1}
                    >
                      <NavLink setIsOpen={setIsOpen} href="/">
                        <Home className="mt-px" /> Home
                      </NavLink>
                    </motion.div>
                    <motion.div
                      variants={slideInVariants}
                      initial="hidden"
                      animate="visible"
                      custom={2}
                    >
                      <NavLink setIsOpen={setIsOpen} href="/beans">
                        <Coffee className="mt-px" /> Beans
                      </NavLink>
                    </motion.div>
                    <motion.div
                      variants={slideInVariants}
                      initial="hidden"
                      animate="visible"
                      custom={3}
                    >
                      <NavLink setIsOpen={setIsOpen} href="/menu">
                        <SquareMenu className="mt-px" /> Menu
                      </NavLink>
                    </motion.div>
                    <motion.div
                      variants={slideInVariants}
                      initial="hidden"
                      animate="visible"
                      custom={4}
                    >
                      <NavLink setIsOpen={setIsOpen} href="/contact">
                        <Contact className="mt-px" /> Contact
                      </NavLink>
                    </motion.div>
                  </div>
                  <div className="flex flex-col-reverse md:flex-col w-full gap-4 mt-4">
                    {/* <CartButton /> */}
                    {!user ? (
                      <>
                        <Button
                          variant="link"
                          className={cn(
                            "text-muted-foreground uppercase tracking-widest",
                            oswald.className
                          )}
                          onClick={(e) => {
                            setIsOpen(false);
                            router.push("/sign-in");
                          }}
                        >
                          <div className="mt-1">Log in</div>
                        </Button>
                        <NavButton
                          setIsOpen={setIsOpen}
                          href="/contact"
                          text="Contact"
                          style="stone"
                        />
                        <NavButton
                          setIsOpen={setIsOpen}
                          href="/sign-up"
                          text="Sign Up"
                          style="orange"
                        />
                      </>
                    ) : (
                      <div className="flex gap-4 w-full">
                        <UserButton />
                        <NavButton
                          setIsOpen={setIsOpen}
                          href="/contact"
                          text="Contact"
                          style="outline"
                          className="w-full"
                        />
                      </div>
                    )}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
          <div className="hidden md:flex ml-4 mr-auto">
            <NavLink setIsOpen={setIsOpen} href="/">
              Home
            </NavLink>
            <NavLink setIsOpen={setIsOpen} href="/beans">
              Beans
            </NavLink>
            <NavLink setIsOpen={setIsOpen} href="/menu">
              Menu
            </NavLink>
            <NavLink setIsOpen={setIsOpen} href="/contact">
              Contact
            </NavLink>
          </div>
          <div className="hidden md:flex items-center gap-2">
            {!user ? (
              <>
                <Button
                  variant="link"
                  className={cn(
                    "text-muted-foreground uppercase tracking-widest",
                    oswald.className
                  )}
                  onClick={(e) => router.push("/sign-in")}
                >
                  <div className="mt-1">Log in</div>
                </Button>
                <NavButton
                  setIsOpen={setIsOpen}
                  href="/contact"
                  text="Contact"
                  style="stone"
                />
                <NavButton
                  setIsOpen={setIsOpen}
                  href="/sign-up"
                  text="Sign Up"
                  style="orange"
                />
              </>
            ) : (
              <>
                <NavButton
                  setIsOpen={setIsOpen}
                  href="/contact"
                  text="Contact"
                  style="ghost"
                />
                <UserButton />
              </>
            )}

            {/* <CartButton /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
