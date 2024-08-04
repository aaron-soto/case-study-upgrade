import { SiteSettings } from "@/app/api/site-settings/types";
import { create } from "zustand";

interface StoreState {
  siteSettings: any;
  fetchSettings: () => Promise<void>;
  updateSetting: (setting: string, value: string) => Promise<void>;
  setInitialSettings: (initialSettings: SiteSettings) => void;
}

export const useSettingsStore = create<StoreState>((set, get) => ({
  siteSettings: null,

  fetchSettings: async () => {
    try {
      const response = await fetch("/api/site-settings");
      const data = await response.json();
      set({ siteSettings: data });
    } catch (error: any) {
      console.error("Failed to fetch site settings:", error.message);
    }
  },

  updateSetting: async (setting: string, value: string) => {
    try {
      const response = await fetch("/api/site-settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ [setting]: value }),
      });

      if (!response.ok) {
        throw new Error("Failed to update setting");
      }

      // Refetch the settings to update the local state
      await get().fetchSettings();
    } catch (error: any) {
      console.error("Failed to update setting:", error.message);
    }
  },

  setInitialSettings: (initialSettings: SiteSettings) => {
    set({ siteSettings: initialSettings });
  },
}));
