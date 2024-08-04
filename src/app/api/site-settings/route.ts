import { NextRequest, NextResponse } from "next/server";
import {
  fetchSiteSettings,
  updateSetting,
} from "@/app/api/site-settings/utils";

import { SiteSettings } from "@/app/api/site-settings/types";

let cachedData: SiteSettings | null = null;
let lastFetch = 0;
const CACHE_DURATION = 1000 * 60 * 60 * 4; // 4 hours

export async function GET(req: NextRequest) {
  if (cachedData && Date.now() - lastFetch < CACHE_DURATION) {
    console.log("Returning cached data:", cachedData);
    return NextResponse.json(cachedData, { status: 200 });
  }

  try {
    const data = await fetchSiteSettings();

    if (!data || data.length === 0) {
      throw new Error("No site settings found");
    }

    cachedData = data as unknown as SiteSettings;
    lastFetch = Date.now();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (data.topbarMessage !== undefined) {
      await updateSetting("topbarMessage", data.topbarMessage);
    }

    if (data.aboutContent !== undefined) {
      await updateSetting("aboutContent", data.aboutContent);
    }

    if (data.storeHours !== undefined) {
      await updateSetting("storeHours", data.storeHours);
    }

    // Invalidate cache after updating
    cachedData = null;
    lastFetch = 0;

    return NextResponse.json({ message: "Data received" }, { status: 200 });
  } catch (error) {
    console.error("Error updating data:", error);
    return NextResponse.json({ error: "Error updating data" }, { status: 500 });
  }
}
