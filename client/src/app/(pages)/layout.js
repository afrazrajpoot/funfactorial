'use client';
import "../globals.css";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import StripeProvider from "../StripeProvider";
import { GlobalState } from "@/context/globalState";
import { store } from "../store/store";

// Metadata for the document
const metadata = {
  title: "Funrides",
  description: "Funrides is a fun and adventurous rides for kids and adults in Leeds and Yorkshire UK",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={metadata.description} />
        <link rel="icon" type="image/svg+xml" href="/images/icon.jpg" />

        {/* Facebook Domain Verification */}
        <meta name="facebook-domain-verification" content="nk3rkz9e1hwdxopf1r4tef9lbqu9du" />

        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playwrite+NZ:wght@100..400&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&family=Playwrite+NZ:wght@100..400&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />

        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-G32R9W9V4X"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-G32R9W9V4X');
            `,
          }}
        ></script>
      </head>
      <body className="bg-white font-Genty overflow-x-hidden" style={{ backgroundAttachment: "fixed" }}>
        <StripeProvider>
          <Provider store={store}>
            <GlobalState>
              <Toaster />
              {children}
            </GlobalState>
          </Provider>
        </StripeProvider>
      </body>
    </html>
  );
}


// export const metadata = {
//   title: 'Funrides',
//   description: 'Funrides is a fun and adventurous rides for kids and adults in Leeds and Yorkshire UK',
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <head>
//         <meta charSet="UTF-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <meta name="description" content="Funrides is a fun and adventurous rides for kids and adults in Leeds and Yorkshire UK" />
//         <link rel="icon" type="image/svg+xml" href="/images/icon.jpg" />

//         {/* Fonts */}
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
//         <link href="https://fonts.googleapis.com/css2?family=Playwrite+NZ:wght@100..400&display=swap" rel="stylesheet" />
//         <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&family=Playwrite+NZ:wght@100..400&display=swap" rel="stylesheet" />
//         <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />

//         {/* Google Analytics */}
//         <script async src="https://www.googletagmanager.com/gtag/js?id=G-G32R9W9V4X"></script>
//         <script
//           dangerouslySetInnerHTML={{
//             __html: `
//               window.dataLayer = window.dataLayer || [];
//               function gtag(){dataLayer.push(arguments);}
//               gtag('js', new Date());
//               gtag('config', 'G-G32R9W9V4X');
//             `,
//           }}
//         ></script>
//       </head>
//       <body>
//         <div id="root">{children}</div>
//       </body>
//     </html>
//   );
// }
