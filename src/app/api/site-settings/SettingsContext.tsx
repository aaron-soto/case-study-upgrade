// src/context/SiteSettingsContext.tsx

"use client";

import React, { createContext, useContext, useEffect } from "react";

import { SiteSettings } from "@/app/api/site-settings/types";
import { useSettingsStore } from "@/stores/settingsStore";

interface SiteSettingsProviderProps {
  initialSettings: SiteSettings;
  children: React.ReactNode;
}

const SiteSettingsContext = createContext<SiteSettings | null>(null);

export const SiteSettingsProvider: React.FC<SiteSettingsProviderProps> = ({
  initialSettings,
  children,
}) => {
  const { siteSettings, setInitialSettings } = useSettingsStore();

  useEffect(() => {
    setInitialSettings(initialSettings);
  }, [initialSettings, setInitialSettings]);

  return (
    <SiteSettingsContext.Provider value={siteSettings}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => {
  return useContext(SiteSettingsContext);
};
