import { ClerkProvider } from "@clerk/nextjs";
import { Urbanist } from "next/font/google";
import { dark } from "@clerk/themes";
import "../globals.css";

const font = Urbanist({ subsets: ["latin"], weight: "500" });

export const metadata = {
  title: "Komyuniti",
  description: "Making social media more prive and community focused.",
};

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
        <body className={font.className}> {children}</body>
      </html>
    </ClerkProvider>
  );
}
