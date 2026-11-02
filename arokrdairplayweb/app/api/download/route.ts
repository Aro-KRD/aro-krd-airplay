import { NextRequest, NextResponse } from "next/server";

const RELEASE_BASE = "https://github.com/Aro-KRD/aro-krd-airplay/releases/download/arokrd";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const target = searchParams.get("target") || "exe";

  switch (target.toLowerCase()) {
    case "installer":
    case "setup":
      return NextResponse.redirect(`${RELEASE_BASE}/AirBridge-setup-1.0.0.exe`, {
        status: 307,
      });

    case "standalone":
    case "exe":
      return NextResponse.redirect(`${RELEASE_BASE}/AirBridge.exe`, {
        status: 307,
      });

    case "zip":
    case "portable":
      return NextResponse.redirect(`${RELEASE_BASE}/AirBridge-1.0.0.zip`, {
        status: 307,
      });

    case "arch":
    case "linux":
      return NextResponse.redirect(`${RELEASE_BASE}/aro-krd-airplay-1.0.0-arch.tar.gz`, {
        status: 307,
      });

    default:
      return NextResponse.json({
        name: "AirBridge",
        version: "1.0.0",
        downloads: {
          installer: `${RELEASE_BASE}/AirBridge-setup-1.0.0.exe`,
          standalone: `${RELEASE_BASE}/AirBridge.exe`,
          portableZip: `${RELEASE_BASE}/AirBridge-1.0.0.zip`,
          archLinux: `${RELEASE_BASE}/aro-krd-airplay-1.0.0-arch.tar.gz`,
        },
      });
  }
}

