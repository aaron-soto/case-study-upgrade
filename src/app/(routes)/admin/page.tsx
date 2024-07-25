"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
import DatePicker from "react-datepicker";
import EventSection from "@/components/sections/admin/events-section";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useSiteSettingsStore } from "@/stores/SiteSettings";
import { useToast } from "@/components/ui/use-toast";

const TimePicker = ({ selected, onChange, className }: any) => {
  return (
    <DatePicker
      selected={selected}
      onChange={onChange}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15} // Set the minute interval to 15
      timeCaption="Time"
      dateFormat="h:mm aa"
      className={cn(
        "dark:bg-dark-bg block w-full rounded border-gray-400 text-sm dark:border-gray-600 dark:text-white dark:[color-scheme:dark] px-2 py-1"
      )}
    />
  );
};

const ContentPage = () => {
  const [topbarMessage, setTopbarMessage] = useState("");
  const { toast } = useToast();
  const { siteSettings, fetchSiteSettings, updateSetting } =
    useSiteSettingsStore();
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      await fetchSiteSettings();
    };

    loadSettings();
  }, [fetchSiteSettings]);

  useEffect(() => {
    if (initialLoad) {
      const topbar = siteSettings.find(
        (setting) => setting.key === "topbar-message"
      );

      if (topbar) setTopbarMessage(topbar.value);

      setInitialLoad(false);
    }
  }, [siteSettings, initialLoad]);

  const saveValues = async () => {
    // Save values to the database
    await updateSetting("topbar-message", topbarMessage);

    // Refetch settings to update topbar
    await fetchSiteSettings();

    // Show a success message
    toast({
      title: "Values Saved",
      description: "Values saved successfully.",
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Site Content</h1>
      </div>
      <div className="mt-8 w-full gap-8 flex">
        <div className="flex-1 flex flex-col gap-6">
          <div className="w-full">
            <Label className="pb-2.5 inline-block">Topbar Message</Label>
            <Input
              className="text-base"
              value={topbarMessage}
              onChange={(e) => setTopbarMessage(e.target.value)}
              placeholder="We are closed for 4th of July! Happy holidays!"
            />
          </div>
          <Button onClick={saveValues}>Save Changes</Button>
        </div>
      </div>
    </div>
  );
};

const AdminPage = () => {
  return (
    <>
      <div className="mb-8">
        <div className="container">
          <Tabs defaultValue="events" className="w-full">
            <TabsList className="w-full justify-start rounded-none bg-transparent border-b">
              <TabsTrigger className="rounded-none" value="events">
                Events
              </TabsTrigger>
              <TabsTrigger className="rounded-none" value="users">
                Users
              </TabsTrigger>
              <TabsTrigger className="rounded-none" value="content">
                Content
              </TabsTrigger>
              <TabsTrigger className="rounded-none" value="analytics">
                Analytics
              </TabsTrigger>
            </TabsList>
            <TabsContent value="events" className="py-8">
              <EventSection adminPage={true} />
            </TabsContent>
            <TabsContent value="users" className="py-4">
              <Skeleton className="flex w-full justify-center items-center h-[500px]">
                <h1 className="text-2xl">Section Coming Soon</h1>
              </Skeleton>
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
    </>
  );
};

export default AdminPage;
