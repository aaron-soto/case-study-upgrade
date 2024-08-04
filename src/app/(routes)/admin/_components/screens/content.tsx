"use client";

import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";
import { useSettingsStore } from "@/stores/settingsStore";
import { useToast } from "@/components/ui/use-toast";

interface FormData {
  topbarMessage: string;
  aboutContent: string;
}

const ContentPage: React.FC = () => {
  const { toast } = useToast();
  const { siteSettings, updateSetting } = useSettingsStore();

  // Initialize the form with default values
  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      topbarMessage: "",
      aboutContent: "",
    },
  });

  useEffect(() => {
    if (siteSettings) {
      const initialValues: FormData = {
        topbarMessage:
          siteSettings.find((setting: any) => setting.id === "topbarMessage")
            ?.message || "",
        aboutContent:
          siteSettings.find((setting: any) => setting.id === "aboutContent")
            ?.content || "",
      };

      // Reset the form with initial values
      reset(initialValues);
    }
  }, [siteSettings, reset]);

  const onSubmit = async (data: FormData) => {
    if (
      data.topbarMessage !==
      siteSettings.find((setting: any) => setting.id === "topbarMessage")
        ?.message
    ) {
      await updateSetting("topbarMessage", data.topbarMessage);
    }

    if (
      data.aboutContent !==
      siteSettings.find((setting: any) => setting.id === "aboutContent")
        ?.content
    ) {
      await updateSetting("aboutContent", data.aboutContent);
    }

    toast({
      title: "Values Saved",
      description: "Values saved successfully.",
    });
  };

  return (
    <div className="flex flex-col items-center w-full lg:w-2/3 py-4">
      <div className="flex justify-between items-center w-full mb-4">
        <h1 className="text-2xl font-bold text-white">Content</h1>
      </div>
      <form
        className="mt-4 flex-col w-full gap-8 flex"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex-1 flex flex-col gap-6">
          <div className="w-full">
            <Label className="pb-2.5 inline-block" htmlFor="topbar-message">
              Topbar Message
            </Label>
            <Controller
              name="topbarMessage"
              control={control}
              render={({ field }) => (
                <Input
                  id="topbar-message"
                  className="text-base"
                  {...field}
                  placeholder="Leave blank for default address, phone number, email..."
                />
              )}
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-6">
          <div className="w-full">
            <Label className="pb-2.5 inline-block" htmlFor="about-content">
              About Content
            </Label>
            <Controller
              name="aboutContent"
              control={control}
              render={({ field }) => (
                <Textarea
                  id="about-content"
                  className="text-base"
                  {...field}
                  placeholder="About Content..."
                />
              )}
            />
          </div>
        </div>
        <Button type="submit" variant="outline" size="lg">
          Save Changes
        </Button>
      </form>
      {/* <div className="flex-1 p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Images</h2>
        </div>
        <div className="h-[300px] w-full">
          <Skeleton className="w-full h-full flex justify-center items-center">
            <h1 className="text-2xl text-neutral-600">Section Coming Soon</h1>
          </Skeleton>
        </div>
      </div> */}
    </div>
  );
};

export default ContentPage;
