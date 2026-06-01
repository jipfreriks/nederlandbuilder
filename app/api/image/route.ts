import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url) {
    return new NextResponse("Missing url", { status: 400 });
  }

  const response = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    },
  });

  if (!response.ok) {
    return new NextResponse("Image fetch failed", {
      status: response.status,
    });
  }

  const buffer = await response.arrayBuffer();

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": response.headers.get("content-type") || "image/png",
      "Cache-Control": "public, max-age=86400",
      "Access-Control-Allow-Origin": "*",
    },
  });
}