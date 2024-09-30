import type { Metadata } from "next";
import "./globals.css";
import StyledComponentsRegistry from "@/lib/registry";
import { Inter } from "next/font/google";
import { FormMain } from "@/components/templates/FormMain";
import { HeaderWithStatus } from "@/components/molecules/HeaderWithStatus";


const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Technical Challenge",
  description: "Next / React",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable}`}>
        <StyledComponentsRegistry>
          <HeaderWithStatus />
          <FormMain>
            {children}
          </FormMain>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
