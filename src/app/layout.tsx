import "./globals.css";
import Navigation from "@/components/Navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header>
          <Navigation />
        </header>
        <main>{children}</main>
        <footer>footer</footer>
      </body>
    </html>
  );
}
