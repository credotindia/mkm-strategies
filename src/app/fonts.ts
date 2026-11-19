import { Hanken_Grotesk, Inter } from "next/font/google";
import localFont from "next/font/local";

export const butler = localFont({
  src: [
    { path: "../fonts/butler/Butler-Free-SBd.woff2", weight: "600", style: "normal" },
    { path: "../fonts/butler/Butler-Free-Bd.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-butler",
  display: "swap",
  fallback: ["Georgia", "serif"],
  adjustFontFallback: "Times New Roman",
});

export const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const fontVariables = [butler.variable, hanken.variable, inter.variable].join(" ");
