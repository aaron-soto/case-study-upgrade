import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import React from "react";
import { db } from "@/lib/firebase";

const Users = () => {
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = async () => {
    const usersRef = collection(db, "users");
    const snapshot = await getDocs(usersRef);

    const usersList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
    }));

    setUsers(usersList);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const makeAdmin = async (userId: string) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, { role: "admin" });
    } catch (error: any) {
      console.error("Failed to make user admin:", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center w-full p-4">
      <div className="flex justify-between items-center w-full mb-4">
        <h1 className="text-2xl font-bold text-white">Users</h1>
        <Button variant="secondary" disabled className="rounded-none">
          Export Submissions
        </Button>
      </div>

      <div className="w-full">
        <div className="px-2 py-1 bg-teal-600/50">users</div>
        <ul>
          {users.map((user: any) => (
            <li
              key={user.id}
              className="border-b flex items-center divide-x-1 border-gray-200 py-2"
            >
              <div className="text-white w-[300px]">{user.email}</div>
              {user.role !== "admin" ? (
                <Button
                  variant="ghost"
                  className="ml-8"
                  onClick={() => makeAdmin(user.id)}
                >
                  Make Admin
                </Button>
              ) : (
                <div className="ml-8">Admin</div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Users;
