import { Inter } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import Navbar from "@/components/Navbar";
import { NavbarForSmScreens } from "@/components/NavbarForSmScreens";
import Footer from "@/components/Footer";
import Head from "next/head";
import { GoogleAnalytics } from '@next/third-parties/google'


const inter = Inter({ subsets: ["latin"] });

const FontDevWeb = localFont({
  src: "../fonts/conthrax-sb.otf",
  display: "swap",
  variable: "--font-dev-web",
});

export const metadata = {
  title: "Custom Software & Web Applications for Business Growth | DevNexus ",
  description:
    "DevNexus specializes in creating custom software and web applications designed to fuel growth and success for your business. Boost your business with innovative digital solutions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>
          {" "}
          Custom Software & Web Applications for Business Growth | DevNexus
        </title>
        <meta
          name="description"
          content="DevNexus specializes in creating custom software and web applications designed to fuel growth and success for your business. Boost your business with innovative digital solutions."
        />

        {/* Open Graph Meta Tags */}
        {/* <meta
          property="og:title"
          content="Custom Software & Web Applications for Business Growth | DevNexus"
        />
        <meta
          property="og:description"
          content="DevNexus specializes in creating custom software and web applications designed to fuel growth and success for your business. Boost your business with innovative digital solutions."
        />
        <meta
          property="og:image"
          content="https://www.devnexus.com/images/preview-image.jpg"
        />
        <meta property="og:url" content="https://www.devnexus.com" />
        <meta property="og:type" content="website" /> */}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "DevNexus",
              url: "https://www.devnexus.com",
              description:
                "DevNexus specializes in creating custom software and web applications designed to fuel growth and success for your business. Boost your business with innovative digital solutions.",
            }),
          }}
        />
      {/* <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script> */}
      </Head>

      <body className={`${inter.className} ${FontDevWeb.variable} `}>
        <Navbar />

        <NavbarForSmScreens />

        {children}

        {/* <div className="calendly-inline-widget mt-6" data-url="https://calendly.com/tanzeel-saleem/meet-greet" 
        style={{
          minWidth:'320px',
          height:'700px'
        }} ></div> */}

        <Footer />
      </body>
      <GoogleAnalytics gaId="G-FMYDM52P5F" />
    </html>
  );
}
