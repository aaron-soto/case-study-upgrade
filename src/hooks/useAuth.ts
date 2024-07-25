import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { create } from "zustand";
import { useEffect } from "react";

interface Metadata {
  creationTime: string;
  lastSignInTime: string;
}

interface LastSeen {
  nanoseconds: number;
  seconds: number;
}

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  lastSeen: LastSeen;
  metadata: Metadata;
  role: string;
  uid: string;
}

interface AuthStore {
  user: User | null;
  setUser: (user: User | null) => void;
  signOutUser: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  signOutUser: () => {
    set({ user: null });
    signOut(auth).catch(console.error);
  },
}));

// Helper function to transform Firebase User to AZUser
const transformFirebaseUser = async (
  firebaseUser: any
): Promise<User | null> => {
  const { email, metadata, uid } = firebaseUser;

  try {
    const userRef = doc(db, "users", uid);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data() as User;
      const lastSeen: LastSeen = {
        nanoseconds: (Date.now() * 1e6) % 1e9,
        seconds: Math.floor(Date.now() / 1000),
      };
      return {
        ...userData,
        email: email || userData.email,
        lastSeen,
        metadata: {
          creationTime: metadata.creationTime || userData.metadata.creationTime,
          lastSignInTime:
            metadata.lastSignInTime || userData.metadata.lastSignInTime,
        },
        uid,
      };
    } else {
      // If user document does not exist, return a default AZUser object
      return {
        email: email || "",
        firstName: "",
        lastName: "",
        lastSeen: {
          nanoseconds: (Date.now() * 1e6) % 1e9,
          seconds: Math.floor(Date.now() / 1000),
        },
        metadata: {
          creationTime: metadata.creationTime || "",
          lastSignInTime: metadata.lastSignInTime || "",
        },
        role: "",
        uid,
      };
    }
  } catch (error) {
    console.error("Error fetching user data from Firestore:", error);
    return null;
  }
};

// Custom hook to initialize and listen for auth changes
export const useAuthListener = () => {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const azUser = await transformFirebaseUser(firebaseUser);
        if (azUser) {
          setUser(azUser);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [setUser]);
};
