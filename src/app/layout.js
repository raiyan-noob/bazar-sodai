import "./globals.css";
import { Hind_Siliguri } from "next/font/google";
import Navbar from "@/src/app/shared/Navbar/page"


const font = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "বাজার সদাই",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে।",
};


export default function RootLayout({ children }) {
  return (
    <html lang="bn" data-theme="bazar">
      <body className={`${font.className} flex min-h-screen flex-col bg-base-200 text-base-content`}>
          <Navbar />
        <main className="flex-1">{children}</main>
       
      </body>
    </html>
  );
}
