"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ContentPage from "@/app/(routes)/admin/_components/screens/content";
import EventsList from "@/components/sections/Anew/EventsList";
import EventsToolbar from "@/components/sections/Anew/EventsToolbar";
import Loading from "@/app/loading";
import Submissions from "@/app/(routes)/admin/_components/screens/submissions";
import Users from "@/app/(routes)/admin/_components/screens/users";
import { useAuthStore } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const AdminPageContent: React.FC = () => {
  return (
    <div className="mb-8">
      <div className="container">
        <Tabs defaultValue="events" className="w-full">
          <div className="overflow-x-auto">
            <TabsList className="flex w-full justify-start gap-2 rounded-none bg-transparent">
              <TabsTrigger
                className="rounded-none px-6 bg-neutral-800/20"
                value="events"
              >
                Events
              </TabsTrigger>
              <TabsTrigger
                className="rounded-none px-6 bg-neutral-800/20"
                value="submissions"
              >
                Submissions
              </TabsTrigger>
              <TabsTrigger
                className="rounded-none px-6 bg-neutral-800/20"
                value="users"
              >
                Users
              </TabsTrigger>
              <TabsTrigger
                className="rounded-none px-6 bg-neutral-800/20"
                value="content"
              >
                Content
              </TabsTrigger>
              {/* <TabsTrigger
                className="rounded-none px-6 bg-neutral-800/20"
                value="analytics"
              >
                Analytics
              </TabsTrigger> */}
            </TabsList>
          </div>
          <TabsContent value="events" className="py-0 md:py-8">
            <EventsToolbar />
            <EventsList adminPage />
          </TabsContent>
          <TabsContent value="submissions" className="py-0 md:py-8">
            <Submissions />
          </TabsContent>
          <TabsContent value="users" className="py-0 md:py-8">
            <Users />
          </TabsContent>
          <TabsContent value="content" className="py-0 md:py-8">
            <ContentPage />
          </TabsContent>
          {/* <TabsContent value="analytics" className="py-4">
            <Skeleton className="flex w-full justify-center items-center h-[500px]">
              <h1 className="text-2xl">Section Coming Soon</h1>
            </Skeleton>
          </TabsContent> */}
        </Tabs>
      </div>
    </div>
  );
};

const AdminPage: React.FC = () => {
  const { user, loading } = useAuthStore();
  const router = useRouter();
  const [isUserChecked, setIsUserChecked] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user || user.role !== "admin") {
        router.push("/sign-in");
      } else {
        setIsUserChecked(true);
      }
    }
  }, [user, loading, router]);

  if (!isUserChecked) {
    return <Loading />;
  }

  return <AdminPageContent />;
};

export default AdminPage;
