import ProgressBar from "@/components/shared/progress-bar";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Admin BPMP",
  description: "Admin BPMP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <TooltipProvider>
          <ProgressBar>
            {children}
          </ProgressBar>
        </TooltipProvider>
      </body>
    </html>
  );
}
