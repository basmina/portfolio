"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "sans-serif", padding: 24 }}>
        <h2>Something went wrong</h2>
        <p>Please try again. If the problem continues, contact the site owner.</p>
        {process.env.NODE_ENV === "development" && (
          <pre style={{ whiteSpace: "pre-wrap", fontSize: 12 }}>
            {error?.name}: {error?.message}
            {"\n"}
            {error?.stack?.split("\n").slice(0, 6).join("\n")}
          </pre>
        )}
        <button onClick={() => reset()} style={{ padding: "8px 16px" }}>
          Try again
        </button>
      </body>
    </html>
  );
}
