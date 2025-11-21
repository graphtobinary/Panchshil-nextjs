import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const videoUrl = searchParams.get("url");

  if (!videoUrl) {
    return new NextResponse("Video URL is required", { status: 400 });
  }

  try {
    // Fetch the video from the external URL
    const videoResponse = await fetch(videoUrl, {
      headers: {
        Range: request.headers.get("range") || "",
      },
    });

    if (!videoResponse.ok) {
      return new NextResponse("Failed to fetch video", {
        status: videoResponse.status,
      });
    }

    // Get the content type and content length
    const contentType =
      videoResponse.headers.get("content-type") || "video/mp4";
    const contentLength = videoResponse.headers.get("content-length");
    const contentRange = videoResponse.headers.get("content-range");

    // Create response headers
    const headers = new Headers();
    headers.set("Content-Type", contentType);
    if (contentLength) {
      headers.set("Content-Length", contentLength);
    }
    if (contentRange) {
      headers.set("Content-Range", contentRange);
    }
    headers.set("Accept-Ranges", "bytes");
    headers.set("Cache-Control", "public, max-age=31536000, immutable");

    // Get the video data
    const videoData = await videoResponse.arrayBuffer();

    return new NextResponse(videoData, {
      status: videoResponse.status,
      headers,
    });
  } catch (error) {
    console.error("Error proxying video:", error);
    return new NextResponse("Error fetching video", { status: 500 });
  }
}
