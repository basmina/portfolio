"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    try {
      const payload = JSON.stringify({
        name: error?.name,
        message: error?.message,
        stack: error?.stack,
        ua: navigator.userAgent,
        url: location.href,
      });
      if (!navigator.sendBeacon?.("/api/client-error", payload)) {
        void fetch("/api/client-error", { method: "POST", body: payload, keepalive: true });
      }
    } catch {}
  }, [error]);

  return (
    <html lang="en">
      <body style={{ fontFamily: "sans-serif", padding: 24 }}>
        <h2>Something went wrong</h2>
        <p>Please try again. If the problem continues, send a screenshot of this page to the site owner.</p>
        <pre style={{ whiteSpace: "pre-wrap", fontSize: 12 }}>
          {error?.name}: {error?.message}
          {"\n"}
          {error?.stack?.split("\n").slice(0, 6).join("\n")}
        </pre>
        <button onClick={() => reset()} style={{ padding: "8px 16px" }}>
          Try again
        </button>
      </body>
    </html>
  );
}
