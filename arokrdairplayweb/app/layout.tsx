import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#007AFF",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://airbridge.vercel.app"),
  title: "AirBridge - Native iOS AirPlay Receiver for Windows & Arch Linux",
  description: "Mirror your iPhone and iPad screen directly to your Windows PC or Arch Linux at 60 FPS, 1440p / 1080p with zero latency. No apps needed on iOS, no cables, completely private.",
  keywords: ["AirPlay Windows", "iPhone screen mirror PC", "AirPlay receiver Windows 11", "AirBridge", "aro-krd-airplay", "AirPlay Arch Linux", "UxPlay Windows"],
  authors: [{ name: "Aro-KRD" }],
  icons: {
    icon: "/favicon.ico",
    apple: "/logo-tile.png",
  },
  openGraph: {
    title: "AirBridge - Native iOS AirPlay Receiver for Windows",
    description: "Turn your PC into an Apple TV AirPlay Receiver. 60 FPS, ultra low latency, hardware accelerated.",
    url: "https://airbridge.vercel.app",
    siteName: "AirBridge",
    images: [
      {
        url: "/preview.png",
        width: 524,
        height: 788,
        alt: "AirBridge App Interface",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AirBridge - Native iOS AirPlay Receiver for Windows",
    description: "Mirror your iPhone directly to your PC with zero lag and no iOS app required.",
    images: ["/preview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased selection:bg-brand-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
