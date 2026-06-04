import * as React from "react";

/** Section header used across the admin views. */
export function PageHead({
  title,
  sub,
  action,
}: {
  title: string;
  sub?: string;
  action?: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        marginBottom: 22,
        gap: 16,
      }}
    >
      <div>
        <h1
          style={{
            margin: 0,
            fontSize: 25,
            fontWeight: 720,
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </h1>
        {sub && (
          <p
            style={{
              margin: "5px 0 0",
              color: "var(--text-2)",
              fontSize: 14.5,
            }}
          >
            {sub}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}
