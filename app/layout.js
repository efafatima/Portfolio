import { DM_Sans } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import CustomCursor from "@/components/CustomCursor";
import GlobalScrollEffects from "@/components/GlobalScrollEffects";
import Navbar from "@/components/Navbar";

const body = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body"
});

export const metadata = {
  title: "Affifa Fatima | Portfolio",
  description:
    "Portfolio of Affifa Fatima, a frontend developer crafting smooth digital experiences.",
  keywords: ["portfolio", "frontend engineer", "creative developer", "Next.js", "GSAP"],
  openGraph: {
    title: "Affifa Fatima | Portfolio",
    description: "Frontend projects, smooth motion, and responsive digital experiences.",
    type: "website"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={body.variable}>
      <body>
        <SmoothScrollProvider>
          <GlobalScrollEffects />
          <CustomCursor />
          <Navbar />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
