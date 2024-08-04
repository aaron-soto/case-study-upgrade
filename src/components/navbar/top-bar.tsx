"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Mail, MapPin, Megaphone, Phone } from "lucide-react";
import { useEffect, useState } from "react";

import { BusinessInfo } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { isAdminOrUp } from "@/lib/utils";
import { useAuthStore } from "@/hooks/useAuth";
import { useSettingsStore } from "@/stores/settingsStore";

const TopBar = () => {
  const { user } = useAuthStore();
  const { siteSettings } = useSettingsStore();
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [topBarItems, setTopBarItems] = useState<any[]>([]);
  const topBarItemsDuration = 5000;

  const defaultItems = [
    {
      icon: Phone,
      content: () => (
        <a
          href={`tel:${BusinessInfo.phoneRaw}`}
          className="flex items-center gap-2 underline hover:text-orange-400"
        >
          {BusinessInfo.phone}
        </a>
      ),
    },
    {
      icon: Mail,
      content: () => (
        <a
          href={`mailto:${BusinessInfo.email}`}
          className="flex items-center gap-2 underline hover:text-orange-400"
        >
          {BusinessInfo.email}
        </a>
      ),
    },
    {
      icon: MapPin,
      content: () => (
        <p className="flex items-center gap-2">{BusinessInfo.address}</p>
      ),
    },
  ];

  useEffect(() => {
    if (!siteSettings) return;

    const topbarMessageSetting = siteSettings.find(
      (setting: any) => setting.id === "topbarMessage"
    );

    if (topbarMessageSetting?.message) {
      setTopBarItems([
        {
          icon: Megaphone,
          content: () => (
            <p className="text-white">{topbarMessageSetting.message}</p>
          ),
        },
      ]);
    } else {
      setTopBarItems(defaultItems);
    }

    setMounted(true);
  }, [siteSettings]);

  useEffect(() => {
    if (!mounted || isHovered || topBarItems.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % topBarItems.length);
    }, topBarItemsDuration);

    return () => clearInterval(interval);
  }, [mounted, isHovered, topBarItems.length]);

  const CurrentIcon = topBarItems[index]?.icon;
  const CurrentContent = topBarItems[index]?.content;

  return (
    <div className="bg-[#0D4F48] h-[40px] w-full">
      <div className="container mx-auto flex justify-between h-full py-2 text-sm">
        <div className="flex items-center h-full gap-4 overflow-hidden">
          <AnimatePresence mode="wait">
            {mounted && topBarItems.length > 0 && (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  duration: 0.3,
                }}
                className="flex items-center gap-2"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {CurrentIcon && (
                  <CurrentIcon className="w-4 h-4 text-orange-400" />
                )}
                {CurrentContent && CurrentContent()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center py-1 justify-center text-right">
          {user && isAdminOrUp(user.role) && (
            <>
              <Button variant="link" asChild>
                <Link
                  href="/admin"
                  className="text-white underline underline-offset-2 hover:no-underline decoration-white/50 hover:text-orange-400"
                >
                  Admin
                </Link>
              </Button>
              <p>|</p>
              <Button
                variant="link"
                className="text-white underline underline-offset-2 hover:no-underline decoration-white/50 hover:text-orange-400"
              >
                Sign Out
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
