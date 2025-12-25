import { Toaster } from "sonner";
import "./globals.css";

export const metadata = {
  title: "Task Frontend - Authentication",
  description: "Next.js authentication app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children} <Toaster />
      </body>
    </html>
  );
}
