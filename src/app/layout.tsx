import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { PAGE_METADATA_DEFAULTS, SITE_URL, formatSeoTitle } from "@/lib/page-metadata-defaults";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Script from "next/script";
import { Toaster } from "sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: formatSeoTitle(PAGE_METADATA_DEFAULTS["/"].title),
  description:
    "Get a free AI-powered marketing audit report for your business. Discover actionable insights, grow your brand, and outperform competitors.",
};

import { AuthProvider } from "@/contexts/auth-context";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={poppins.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" type="image/x-icon" />
        {/* Hotjar Tracking Code */}
        <Script id="hotjar" strategy="afterInteractive">
          {`
            (function (h, o, t, j, a, r) {
              h.hj = h.hj || function () { (h.hj.q = h.hj.q || []).push(arguments) };
              h._hjSettings = { hjid: 2342082, hjsv: 6 };
              a = o.getElementsByTagName('head')[0];
              r = o.createElement('script'); r.async = 1;
              r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
              a.appendChild(r);
            })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
          `}
        </Script>

        {/* Google tag (gtag.js) - G-WDVX7TD81Y */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WDVX7TD81Y"
          strategy="afterInteractive"
        />
        <Script id="google-analytics-1" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WDVX7TD81Y');
          `}
        </Script>

        {/* Google tag (gtag.js) - AW-17618812380 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17618812380"
          strategy="afterInteractive"
        />
        <Script id="google-analytics-2" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17618812380');
          `}
        </Script>

        {/* Leadsy.ai Tag */}
        <Script
          id="vtag-ai-js"
          src="https://r2.leadsy.ai/tag.js"
          data-pid="1sOK8RqxPjpIJMT3U"
          data-version="062024"
          strategy="afterInteractive"
        />

        {/* Meta Pixel Code 1 */}
        <Script id="meta-pixel-1" strategy="afterInteractive">
          {`
            !function (f, b, e, v, n, t, s) {
              if (f.fbq) return; n = f.fbq = function () {
                n.callMethod ?
                  n.callMethod.apply(n, arguments) : n.queue.push(arguments)
              };
              if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
              n.queue = []; t = b.createElement(e); t.async = !0;
              t.src = v; s = b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t, s)
            }(window, document, 'script',
              'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '845532422598641');
            fbq('track', 'PageView');
          `}
        </Script>

        {/* Meta Pixel Code 2 */}
        <Script id="meta-pixel-2" strategy="afterInteractive">
          {`
            !function (f, b, e, v, n, t, s) {
              if (f.fbq) return; n = f.fbq = function () {
                n.callMethod ?
                  n.callMethod.apply(n, arguments) : n.queue.push(arguments)
              };
              if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
              n.queue = []; t = b.createElement(e); t.async = !0;
              t.src = v; s = b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t, s)
            }(window, document, 'script',
              'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '933894453735634');
            fbq('track', 'PageView');
          `}
        </Script>

        {/* Tidio Code */}
        <Script
          src="//code.tidio.co/pxgihobgsefls6vysouitv1plqgdk7ht.js"
          strategy="afterInteractive"
        />

        {/* Pre-React Logout Script */}
        <Script id="logout-logic" strategy="beforeInteractive">
          {`
            (function () {
              const urlParams = new URLSearchParams(window.location.search);
              if (urlParams.get('logout') === 'true') {
                console.log('[Pre-React] Logout parameter detected - clearing all auth data');
                localStorage.clear();
                sessionStorage.clear();
                urlParams.delete('logout');
                const newUrl = window.location.pathname +
                  (urlParams.toString() ? '?' + urlParams.toString() : '');
                window.history.replaceState({}, '', newUrl);
                console.log('[Pre-React] Auth data cleared, URL cleaned');
              }
            })();
          `}
        </Script>
      </head>
      <body style={{ fontFamily: "var(--font-poppins), ui-sans-serif, system-ui, sans-serif" }}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
            {children}
            <Toaster position="top-center" richColors />
          </ThemeProvider>
        </AuthProvider>
        {/* Meta Pixel noscript fallbacks */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=845532422598641&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=933894453735634&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </body>
    </html>
  );
}
