import { collection, doc, getDocs, updateDoc } from "firebase/firestore";

import { db } from "@/lib/firebase";

export const fetchSiteSettings = async () => {
  try {
    const settingsCollection = collection(db, "settings");
    const settingsSnapshot = await getDocs(settingsCollection);

    const settingsData = settingsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return settingsData;
  } catch (error: unknown) {
    console.error("Failed to fetch site settings:", error);
    throw new Error("Could not fetch site settings");
  }
};

export const updateSetting = async (settingId: string, value: string) => {
  try {
    const settingsRef = doc(db, "settings", settingId);

    await updateDoc(settingsRef, { message: value });

    return;
  } catch (error: unknown) {
    console.error("Failed to update setting:", error);
    throw new Error("Could not update setting");
  }
};
