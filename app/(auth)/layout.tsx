import { ClerkProvider } from "@clerk/nextjs";
import { Urbanist } from "next/font/google";
import { dark, neobrutalism } from "@clerk/themes";
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
        <body className={font.className}> {children}</body>
      </html>
    </ClerkProvider>
  );
}
