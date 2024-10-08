import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Metadata } from "next";
import { ReactNode } from "react";

import ErrorBoundary from "@/components/ErrorBoundary";
import Providers from "@/components/Providers";
import theme from "@/theme/theme";

export const metadata: Metadata = {
  title: "Asan",
  description: "Asan admin portal",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          <Providers>
            <AppRouterCacheProvider>
              <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <div id="root">{children}</div>
              </ThemeProvider>
            </AppRouterCacheProvider>
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}
