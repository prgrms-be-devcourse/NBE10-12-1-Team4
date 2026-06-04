import * as React from "react";

export type IconProps = {
  d: string | string[];
  size?: number;
  fill?: string;
  [key: string]: unknown;
}

/** Generic stroke icon. Pass a single path string or an array of path strings. */
export function Icon({ d, size = 18, fill, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      {Array.isArray(d) ? (
        d.map((p, i) => <path key={i} d={p} />)
      ) : (
        <path d={d} />
      )}
    </svg>
  );
}

interface GlyphProps {
  size?: number;
}
type Glyph = (p?: GlyphProps) => React.ReactElement;

export const Icons: Record<string, Glyph> = {
  cup: (p) => (
    <Icon
      size={p?.size}
      d={[
        "M5 8h11v6a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5V8z",
        "M16 9h2a2 2 0 0 1 0 4h-2",
        "M7 3.5l-.5 1.5M10.5 3.5L10 5M13.5 3.5L13 5",
      ]}
    />
  ),
  plus: (p) => <Icon size={p?.size} d={["M12 5v14", "M5 12h14"]} />,
  minus: (p) => <Icon size={p?.size} d="M5 12h14" />,
  trash: (p) => (
    <Icon
      size={p?.size}
      d={[
        "M3 6h18",
        "M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2",
        "M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6",
        "M10 11v6M14 11v6",
      ]}
    />
  ),
  edit: (p) => (
    <Icon
      size={p?.size}
      d={["M12 20h9", "M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"]}
    />
  ),
  close: (p) => <Icon size={p?.size} d={["M18 6 6 18", "M6 6l12 12"]} />,
  check: (p) => <Icon size={p?.size} d="M20 6 9 17l-5-5" />,
  search: (p) => (
    <Icon
      size={p?.size}
      d={["M11 11m-7 0a7 7 0 1 0 14 0a7 7 0 1 0-14 0", "M21 21l-4.3-4.3"]}
    />
  ),
  arrowRight: (p) => <Icon size={p?.size} d={["M5 12h14", "M13 6l6 6-6 6"]} />,
  arrowLeft: (p) => <Icon size={p?.size} d={["M19 12H5", "M11 6l-6 6 6 6"]} />,
  bag: (p) => (
    <Icon
      size={p?.size}
      d={[
        "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z",
        "M3 6h18",
        "M16 10a4 4 0 0 1-8 0",
      ]}
    />
  ),
  receipt: (p) => (
    <Icon
      size={p?.size}
      d={[
        "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z",
        "M8 8h8M8 12h8M8 16h5",
      ]}
    />
  ),
  box: (p) => (
    <Icon
      size={p?.size}
      d={["M21 8l-9-5-9 5 9 5 9-5Z", "M3 8v8l9 5 9-5V8", "M12 13v8"]}
    />
  ),
  user: (p) => (
    <Icon
      size={p?.size}
      d={["M20 21a8 8 0 1 0-16 0", "M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"]}
    />
  ),
  clock: (p) => (
    <Icon
      size={p?.size}
      d={["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z", "M12 6v6l4 2"]}
    />
  ),
  logout: (p) => (
    <Icon
      size={p?.size}
      d={[
        "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",
        "M16 17l5-5-5-5",
        "M21 12H9",
      ]}
    />
  ),
  chart: (p) => <Icon size={p?.size} d={["M3 3v18h18", "M7 15l3-4 3 3 4-6"]} />,
  bean: (p) => (
    <Icon
      size={p?.size}
      d={[
        "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z",
        "M8.5 16C12 14 12 10 15.5 8",
        "M8 8c2 1 2 3 0 4",
      ]}
    />
  ),
  trendUp: (p) => (
    <Icon size={p?.size} d={["M22 7l-8.5 8.5-5-5L2 17", "M16 7h6v6"]} />
  ),
  won: (p) => (
    <Icon size={p?.size} d={["M4 6l3 11 5-9 5 9 3-11", "M3 10h18M3 13h18"]} />
  ),
};
