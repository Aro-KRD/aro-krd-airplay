import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://api.github.com/repos/Aro-KRD/aro-krd-airplay/releases",
      {
        headers: {
          "User-Agent": "AirBridge-Web",
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );

    if (!res.ok) {
      throw new Error(`GitHub API returned ${res.status}`);
    }

    const releases = await res.json();
    const latest = releases[0];

    const assets = latest?.assets?.map((a: any) => ({
      name: a.name,
      size: a.size,
      downloadCount: a.download_count,
      browserDownloadUrl: a.browser_download_url,
    })) || [];

    return NextResponse.json({
      tag: latest?.tag_name || "v1.0.0",
      name: latest?.name || "AirBridge v1.0.0",
      publishedAt: latest?.published_at,
      htmlUrl: latest?.html_url,
      assets,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        tag: "v1.0.0",
        name: "AirBridge v1.0.0",
        error: error.message,
        fallback: true,
      },
      { status: 200 }
    );
  }
}

