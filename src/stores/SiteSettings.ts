import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { create } from "zustand";
import { db } from "@/lib/firebase";

interface StoreState {
  siteSettings: any[];
  addSetting: (setting: string, value: string) => Promise<void>;
  fetchSiteSettings: () => Promise<void>;
  updateSetting: (setting: string, value: string) => Promise<void>;
}

export const useSiteSettingsStore = create<StoreState>((set, get) => ({
  siteSettings: [],
  addSetting: async (setting: string, value: string) => {
    try {
      const settingsCollection = collection(db, "site-settings");
      await addDoc(settingsCollection, {
        key: setting,
        value,
      });
      await get().fetchSiteSettings();
    } catch (error: any) {
      console.error("Failed to add setting:", error.message);
    }
  },
  fetchSiteSettings: async () => {
    try {
      const settingsCollection = collection(db, "site-settings");
      const settings = await getDocs(settingsCollection);

      set({
        siteSettings: settings.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })),
      });
    } catch (error: any) {
      console.error("Failed to fetch site settings:", error.message);
    }
  },
  updateSetting: async (setting: string, value: string) => {
    try {
      const settingsCollection = collection(db, "site-settings");
      const q = query(settingsCollection, where("key", "==", setting));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        await updateDoc(docRef, { value });
      } else {
        await addDoc(settingsCollection, {
          key: setting,
          value,
        });
      }
      await get().fetchSiteSettings();
    } catch (error: any) {
      console.error("Failed to update setting:", error.message);
    }
  },
}));
