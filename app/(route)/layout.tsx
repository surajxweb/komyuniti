import { ClerkProvider } from "@clerk/nextjs";
import "../globals.css";
import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import TopBar from "@/components/shared/TopBar";
import LeftBar from "@/components/shared/LeftBar";
import RightBar from "@/components/shared/RightBar";
import BottomBar from "@/components/shared/BottomBar";
import { dark, neobrutalism } from "@clerk/themes";

const bodyfont = Urbanist({ subsets: ["latin"], weight: "500" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          baseTheme: [dark],
          card: {
            backgroundColor: "#222222",
          },

          formButtonPrimary: {
            fontSize: 14,
            textTransform: "none",
            backgroundColor: "#586aea",
            "&:hover, &:focus, &:active": {
              backgroundColor: "#4350ad",
            },
          },
        },
      }}
    >
      <html lang='en'>
        <body className={bodyfont.className}>
          <TopBar />
          <main>
            <LeftBar />
            {children}
            <RightBar />
          </main>
          <BottomBar />
        </body>
      </html>
    </ClerkProvider>
  );
}
