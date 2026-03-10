import { NextResponse } from "next/server";
import { getAuthToken } from "@/api/CMS.api";
import { getEnquiryPropertyList } from "@/api/property";

export async function GET() {
  try {
    // getAuthToken returns parsed JSON, not a Response
    const tokenData = (await getAuthToken()) as { token?: string };
    const token = tokenData?.token;

    if (!token) {
      return NextResponse.json(
        { error: "Failed to retrieve auth token" },
        { status: 500 }
      );
    }

    // getEnquiryPropertyList follows the same pattern and returns JSON
    const propertiesData = await getEnquiryPropertyList(token);

    return NextResponse.json(propertiesData);
  } catch (error) {
    console.error("Error fetching enquiry property list:", error);
    return NextResponse.json(
      { error: "Unexpected error while fetching properties" },
      { status: 500 }
    );
  }
}
