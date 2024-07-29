import { NextRequest, NextResponse } from "next/server";
import { collection, getDocs, query } from "firebase/firestore";

import { db } from "@/lib/firebase";
import { fetchEvents } from "@/app/api/events/util";

export async function GET(req: NextRequest) {
  try {
    const events = await fetchEvents();
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Error fetching events" },
      { status: 500 }
    );
  }
}
