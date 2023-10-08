import { ClerkProvider } from "@clerk/nextjs";
import "../globals.css";
import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import TopBar from "@/components/TopBar";
import LeftBar from "@/components/LeftBar";
import RightBar from "@/components/RightBar";
import BottomBar from "@/components/BottomBar";
import { dark } from "@clerk/themes";

const bodyfont = Urbanist({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
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
