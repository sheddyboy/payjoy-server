import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  if (!lat || !lng) {
    return new NextResponse(
      JSON.stringify({ error: "Latitude and longitude are required" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "https://bx-testing.webflow.io",
        },
      }
    );
  }

  try {
    const apiUrl = new URL("https://payjoy.com/partner-stores.php");
    apiUrl.searchParams.set("category", "upgrade-phone");
    apiUrl.searchParams.set("lat", lat);
    apiUrl.searchParams.set("lng", lng);

    const response = await fetch(apiUrl);
    const data = await response.json();

    return new NextResponse(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://bx-testing.webflow.io",
      },
    });
  } catch (error) {
    console.error("Error fetching locations:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch locations" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "https://bx-testing.webflow.io",
        },
      }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      "Access-Control-Allow-Origin": "https://bx-testing.webflow.io",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
