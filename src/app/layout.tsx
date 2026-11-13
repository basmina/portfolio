import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Zamruth Begum M | Angular Technical Lead · AI Agent Builder",
  description:
    "Portfolio of Zamruth Begum M — Technical Lead, Angular specialist, and builder of personalized AI agents with 12 years of software experience.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
