"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Image from "next/image";
import SectionHeading from "@/components/ui/section-heading";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/hooks/useAuth";

const ProfilePage = () => {
  const { user } = useAuthStore();

  return (
    user && (
      <section className="bg-[#0c0b09]">
        <div className="my-8 md:py-16">
          <div className="container">
            <SectionHeading
              title="Profile"
              description="Your profile information"
            />
          </div>

          <div className="container">
            <Tabs defaultValue="account" className="w-full mt-8">
              <TabsList className="w-full justify-start rounded-none bg-transparent border-b">
                <TabsTrigger className="rounded-none" value="account">
                  Account
                </TabsTrigger>
                <TabsTrigger className="rounded-none" value="orders">
                  Orders
                </TabsTrigger>
                <TabsTrigger className="rounded-none" value="notifications">
                  Notifications
                </TabsTrigger>
                <TabsTrigger className="rounded-none" value="settings">
                  Settings
                </TabsTrigger>
              </TabsList>
              <TabsContent value="account" className="w-full py-4 h-[600px]">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="bg-stone-800/20 p-4 rounded-none">
                    <h2 className="text-xl font-bold">Personal Information</h2>
                    <div className="mt-4">
                      <p className="text-gray-500">First Name</p>
                      <p className="text-lg font-bold">{user.firstName}</p>
                    </div>
                    <div className="mt-4">
                      <p className="text-gray-500">Last Name</p>
                      <p className="text-lg font-bold">{user.lastName}</p>
                    </div>
                    <div className="mt-4">
                      <p className="text-gray-500">Email</p>
                      <p className="text-lg font-bold">{user.email}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="orders" className="py-4">
                <Skeleton className="flex w-full justify-center items-center h-[600px]">
                  <h1 className="text-2xl">Section Coming Soon</h1>
                </Skeleton>
              </TabsContent>
              <TabsContent value="analytics" className="py-4">
                <Skeleton className="flex w-full justify-center items-center h-[600px]">
                  <h1 className="text-2xl">Section Coming Soon</h1>
                </Skeleton>
              </TabsContent>
              <TabsContent value="notifications" className="py-4">
                <Skeleton className="flex w-full justify-center items-center h-[600px]">
                  <h1 className="text-2xl">Section Coming Soon</h1>
                </Skeleton>
              </TabsContent>
              <TabsContent value="settings" className="py-4">
                <Skeleton className="flex w-full justify-center items-center h-[600px]">
                  <h1 className="text-2xl">Section Coming Soon</h1>
                </Skeleton>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    )
  );
};

export default ProfilePage;
