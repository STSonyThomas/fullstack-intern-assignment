import { ReduxProvider } from "@/redux/provider";
import { Inter } from "next/font/google";
import { FaPhoneAlt } from "react-icons/fa";
import { Analytics } from "@vercel/analytics/react"
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>{children}</ReduxProvider>
        <footer className="bg-gray-100 flex flex-row justify-center items-center space-x-2">
          <a href="https://github.com/STSonyThomas" target="_blank">
            <img
              src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
              alt="GitHub"
              className="h-4 object-contain"
            />
          </a>
          <a href="mailto:the.sonythomas@gmail.com">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Mail_%28iOS%29.svg"
              alt="Email"
              className="h-4 object-contain"
            />
          </a>
          <a href="tel:+918136984259">
            <FaPhoneAlt className="text-black"/>
          </a>
          <Analytics/>
        </footer>
      </body>
    </html>
  );
}
