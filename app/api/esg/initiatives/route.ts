import { NextResponse } from "next/server";
import ApiException from "@/api/Api.exception";
import { getAuthToken, getEsgInitiatives } from "@/api/CMS.api";
import { AuthTokenResponse } from "@/interfaces";

export async function GET() {
  try {
    let token: string | null = null;
    try {
      const tokenResponse = (await getAuthToken()) as AuthTokenResponse;
      if (tokenResponse?.token && typeof tokenResponse.token === "string") {
        token = tokenResponse.token;
      }
    } catch (error) {
      console.error("Error fetching auth token:", error);
      return NextResponse.json(
        { error: "Failed to authenticate" },
        { status: 500 }
      );
    }

    if (!token) {
      return NextResponse.json(
        { error: "Authentication token not available" },
        { status: 500 }
      );
    }

    const result = await getEsgInitiatives(token);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error fetching ESG initiatives:", error);

    if (error instanceof ApiException) {
      const statusCode = error.statusCode || 500;
      return NextResponse.json(
        { error: error.message || "Failed to fetch ESG initiatives" },
        { status: statusCode }
      );
    }

    return NextResponse.json(
      { error: "Failed to fetch ESG initiatives" },
      { status: 500 }
    );
  }
}
