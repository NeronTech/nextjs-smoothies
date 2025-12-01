// app/layout.tsx (server component)
import "./globals.css";
import PwaRegister from "../components/PwaRegister";
import PageLoader from "../components/PageLoader";

export const metadata = {
  title: "My App — Landing",
  description: "Next.js SPA with full SEO + PWA + GAS backend",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Smoothies & More</title>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#9333ea" />

        {/* Face API.js */}
        <script
          defer
          src="https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/dist/face-api.min.js"
        ></script>

        {/* Tailwind CDN */}
        <script src="https://cdn.tailwindcss.com"></script>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.0.0/fonts/remixicon.css"
          rel="stylesheet"
        />

        {/* Toastr */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css"
        />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
      </head>

      <body className="bg-gradient-to-b from-white to-gray-50 font-sans">
        <PageLoader />
        <PwaRegister>{children}</PwaRegister>
      </body>
    </html>
  );
}
