import * as React from "react";
import type { MenuBarProps, MenuItem } from "../../../type/product";

/**
 * MenuBar — vertical navigation rail (the admin "메뉴 바").
 * Pure & data-driven; the parent owns selection and passes `onSelect`.
 */
export default function MenuBar({
  brand,
  sectionLabel,
  items,
  activeId,
  onSelect,
  footer,
  width = 244,
}: MenuBarProps) {
  return (
    <aside style={{ ...styles.aside, width }}>
      {brand && (
        <div style={styles.brand}>
          {brand.icon && <span style={styles.brandIcon}>{brand.icon}</span>}
          <div>
            <div style={styles.brandTitle}>{brand.title}</div>
            {brand.subtitle && (
              <div style={styles.brandSub}>{brand.subtitle}</div>
            )}
          </div>
        </div>
      )}
      <nav style={styles.nav}>
        {sectionLabel && <div style={styles.section}>{sectionLabel}</div>}
        {items?.map((it) => (
          <MenuBarItem
            key={it.id}
            item={it}
            active={it.id === activeId}
            onSelect={onSelect}
          />
        ))}
      </nav>
      {footer && <div style={styles.footer}>{footer}</div>}
    </aside>
  );
}

function MenuBarItem({
  item,
  active,
  onSelect,
}: {
  item: MenuItem;
  active: boolean;
  onSelect: (id: string) => void;
}) {
  const [hover, setHover] = React.useState(false);
  const showBadge = item.badge != null && item.badge > 0;
  return (
    <button
      type="button"
      onClick={() => onSelect(item.id)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        ...styles.item,
        background: active
          ? "var(--accent-soft)"
          : hover
          ? "var(--panel-2)"
          : "transparent",
        color: active ? "var(--accent-text)" : "var(--text-2)",
      }}
    >
      {item.icon && <span style={styles.itemIcon}>{item.icon}</span>}
      {item.label}
      {showBadge && (
        <span
          style={{
            ...styles.badge,
            background: active ? "var(--accent)" : "var(--border-strong)",
          }}
        >
          {item.badge}
        </span>
      )}
    </button>
  );
}

const styles: Record<string, React.CSSProperties> = {
  aside: {
    borderRight: "1px solid var(--border)",
    background: "var(--panel)",
    display: "flex",
    flexDirection: "column",
    position: "sticky",
    top: 0,
    height: "100vh",
    fontFamily: "inherit",
  },
  brand: {
    padding: "20px 18px",
    display: "flex",
    alignItems: "center",
    gap: 10,
    borderBottom: "1px solid var(--border)",
  },
  brandIcon: {
    display: "inline-flex",
    padding: 7,
    borderRadius: 9,
    background: "var(--accent)",
    color: "#fff",
  },
  brandTitle: {
    fontWeight: 700,
    fontSize: 14.5,
    lineHeight: 1.1,
    color: "var(--text)",
  },
  brandSub: { fontSize: 11.5, color: "var(--muted)" },
  nav: { padding: 12, display: "flex", flexDirection: "column", gap: 3 },
  section: {
    fontSize: 11,
    fontWeight: 680,
    color: "var(--muted)",
    padding: "8px 12px 4px",
    letterSpacing: ".04em",
  },
  item: {
    display: "flex",
    alignItems: "center",
    gap: 11,
    width: "100%",
    padding: "10px 12px",
    border: "none",
    borderRadius: 9,
    cursor: "pointer",
    fontSize: 14.5,
    fontWeight: 560,
    fontFamily: "inherit",
    transition: "background .12s",
    textAlign: "left",
  },
  itemIcon: { display: "inline-flex" },
  badge: {
    marginLeft: "auto",
    fontSize: 12,
    fontWeight: 680,
    color: "#fff",
    borderRadius: 999,
    minWidth: 20,
    height: 20,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 6px",
  },
  footer: {
    marginTop: "auto",
    padding: 12,
    borderTop: "1px solid var(--border)",
  },
};
