"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
import DatePicker from "react-datepicker";
import EventSection from "@/components/sections/admin/events-section";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Loading from "@/app/loading";
import { Skeleton } from "@/components/ui/skeleton";
import Submissions from "@/app/(routes)/admin/_components/screens/submissions";
import { Textarea } from "@/components/ui/textarea";
import Users from "@/app/(routes)/admin/_components/screens/users";
import { cn } from "@/lib/utils";
import { useAdminEventsStore } from "@/stores/AdminEventsStore";
import { useAuthStore } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useSiteSettingsStore } from "@/stores/SiteSettings";
import { useToast } from "@/components/ui/use-toast";

interface TimePickerProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  className?: string;
}

const ContentPage: React.FC = () => {
  const [topbarMessage, setTopbarMessage] = useState("");
  const [aboutContent, setAboutContent] = useState("");
  const { toast } = useToast();
  const { siteSettings, fetchSiteSettings, updateSetting } =
    useSiteSettingsStore();
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    fetchSiteSettings();
  }, [fetchSiteSettings]);

  useEffect(() => {
    if (initialLoad) {
      const topbar = siteSettings.find(
        (setting) => setting.key === "topbar-message"
      );
      const about = siteSettings.find(
        (setting) => setting.key === "about-content"
      );

      if (topbar) setTopbarMessage(topbar.value);
      if (about) setAboutContent(about.value);

      setInitialLoad(false);
    }
  }, [siteSettings, initialLoad]);

  const saveValues = async () => {
    await updateSetting("topbar-message", topbarMessage);
    await updateSetting("about-content", aboutContent);
    await fetchSiteSettings();
    toast({
      title: "Values Saved",
      description: "Values saved successfully.",
    });
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-1 p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Images</h2>
        </div>
        <div className="mt-4 flex-col w-full gap-8 flex">
          <div className="flex-1 flex flex-col gap-6">
            <div className="w-full">
              <Label className="pb-2.5 inline-block" htmlFor="topbar-message">
                Topbar Message
              </Label>
              <Input
                id="topbar-message"
                className="text-base"
                value={topbarMessage}
                onChange={(e) => setTopbarMessage(e.target.value)}
                placeholder="leave blank for default address, phone number, email..."
              />
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-6">
            <div className="w-full">
              <Label className="pb-2.5 inline-block" htmlFor="about-content">
                About content
              </Label>
              <Textarea
                value={aboutContent}
                onChange={(e) => setAboutContent(e.target.value)}
                id="about-content"
                className="text-base"
                placeholder="About Content..."
              />
            </div>
          </div>
          <Button variant="outline" size="lg" onClick={saveValues}>
            Save Changes
          </Button>
        </div>
      </div>
      <div className="flex-1 p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Images</h2>
        </div>
        <div className="h-[300px] w-full">
          <Skeleton className="w-full h-full flex justify-center items-center">
            <h1 className="text-2xl text-neutral-600">Section Coming Soon</h1>
          </Skeleton>
        </div>
      </div>
    </div>
  );
};

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
              <TabsTrigger
                className="rounded-none px-6 bg-neutral-800/20"
                value="analytics"
              >
                Analytics
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="events" className="py-8">
            <EventSection adminPage />
          </TabsContent>
          <TabsContent value="submissions" className="py-8">
            <Submissions />
          </TabsContent>
          <TabsContent value="users" className="py-8">
            <Users />
          </TabsContent>
          <TabsContent value="content" className="py-8">
            <ContentPage />
          </TabsContent>
          <TabsContent value="analytics" className="py-4">
            <Skeleton className="flex w-full justify-center items-center h-[500px]">
              <h1 className="text-2xl">Section Coming Soon</h1>
            </Skeleton>
          </TabsContent>
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
        router.push("/");
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
