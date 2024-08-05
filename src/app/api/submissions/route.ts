import { NextRequest, NextResponse } from "next/server";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { v4 as uuidv4 } from "uuid";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const data: any = await req.json();

    await setDoc(doc(db, "submissions", uuidv4()), data);

    return NextResponse.json({ message: "Event created" }, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Error creating event" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const submissionsCollection = collection(db, "submissions");
    const submissionsSnapshot = await getDocs(submissionsCollection);

    const submissionsData = submissionsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (!submissionsData || submissionsData.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(submissionsData, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Error fetching events" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const data: any = await req.json();
    const { id } = data; // Ensure that you pass the `id` in the request body

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await deleteDoc(doc(db, "submissions", id));

    return NextResponse.json(
      { message: "Submission deleted" },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error deleting submission:", error);
    return NextResponse.json(
      { error: "Error deleting submission" },
      { status: 500 }
    );
  }
}
