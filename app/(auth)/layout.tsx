import { ClerkProvider } from "@clerk/nextjs";
import { Urbanist } from "next/font/google";
import { dark } from '@clerk/themes';
import "../globals.css";

const font = Urbanist({ subsets: ["latin"] });

export const metadata = {
  title: "Yass",
  description: "Yet Another Social Site running on Next JS 13.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider 
    appearance={{
      baseTheme: dark
    }}
    >
      <html lang='en'>
        <body className={font.className}> {children}</body>
      </html>
    </ClerkProvider>
  );
}
