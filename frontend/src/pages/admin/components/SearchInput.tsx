import React from "react";

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  width?: number;
  style?: React.CSSProperties;
}

/**
 * SearchInput — bordered text input with a leading search glyph.
 * Consolidates the duplicated search boxes in the orders & products admin.
 */
export function SearchInput({ value, onChange, placeholder = "검색", width, style }: SearchInputProps) {
  return (
    <div style={{ position: "relative", width: width ?? "100%", ...style }}>
      <span style={iconStyle}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
      </span>
      <input
        className="input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ paddingLeft: 36 }}
      />
    </div>
  );
}

const iconStyle: React.CSSProperties = {
  position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
  color: "var(--muted)", display: "inline-flex", pointerEvents: "none", zIndex: 1,
};
