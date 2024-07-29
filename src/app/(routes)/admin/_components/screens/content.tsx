"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useSiteSettingsStore } from "@/stores/SiteSettings";
import { useToast } from "@/components/ui/use-toast";

const ContentPage: React.FC = () => {
  const [topbarMessage, setTopbarMessage] = useState("");
  const [aboutContent, setAboutContent] = useState("");
  const [venueRequestNote, setVenueRequestNote] = useState("");
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
      const venueRequestNote = siteSettings.find(
        (setting) => setting.key === "venue-request-note"
      );

      if (topbar) setTopbarMessage(topbar.value);
      if (about) setAboutContent(about.value);
      if (venueRequestNote) setVenueRequestNote(venueRequestNote.value);

      setInitialLoad(false);
    }
  }, [siteSettings, initialLoad]);

  const saveValues = async () => {
    await updateSetting("topbar-message", topbarMessage);
    await updateSetting("about-content", aboutContent);
    await updateSetting("venue-request-note", venueRequestNote);
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
          <h2 className="text-xl font-semibold">Content</h2>
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

          <div className="flex-1 flex flex-col gap-6">
            <div className="w-full">
              <Label
                className="pb-2.5 inline-block"
                htmlFor="venue-request-note"
              >
                Venue Request Note
              </Label>
              <Textarea
                value={venueRequestNote}
                onChange={(e) => setVenueRequestNote(e.target.value)}
                id="venue-request-note"
                className="text-base"
                placeholder="Venue Request Note for the events page..."
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

export default ContentPage;
