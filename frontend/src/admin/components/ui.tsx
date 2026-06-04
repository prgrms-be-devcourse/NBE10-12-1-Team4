import { useState, useEffect, useCallback } from "react";
import { Icons } from "./icons";
import type { Product, OrderStatus } from "../../type/product";

type Tone = "gray" | "brown" | "green" | "amber" | "red" | "blue";

/* ---------- Button ---------- */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline" | "soft" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
}
export function Button({
  variant = "solid",
  size = "md",
  icon,
  iconRight,
  children,
  className = "",
  ...rest
}: ButtonProps) {
  const only = !children && icon;
  return (
    <button
      className={`btn btn-${variant} btn-${size} ${
        only ? "btn-icon" : ""
      } ${className}`}
      {...rest}
    >
      {icon}
      {children}
      {iconRight}
    </button>
  );
}

/* ---------- Field / Input ---------- */
export function Field({
  label,
  hint,
  children,
}: {
  label?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="field">
      {label && <label>{label}</label>}
      {children}
      {hint && (
        <div style={{ fontSize: 12, color: "var(--muted)" }}>{hint}</div>
      )}
    </div>
  );
}
export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className="input" {...props} />;
}
export function Textarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>
) {
  return <textarea className="textarea" {...props} />;
}
export function Select({
  children,
  ...rest
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className="select" {...rest}>
      {children}
    </select>
  );
}

/* ---------- Badge ---------- */
export function Badge({
  tone = "gray",
  dot,
  children,
}: {
  tone?: Tone;
  dot?: boolean;
  children: React.ReactNode;
}) {
  return (
    <span className={`badge badge-${tone}`}>
      {dot && <span className="dot" />}
      {children}
    </span>
  );
}

const STATUS_TONE: Record<OrderStatus, Tone> = {
  접수: "blue",
  준비중: "amber",
  완료: "green",
  취소: "red",
};
export function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <Badge tone={STATUS_TONE[status] || "gray"} dot>
      {status}
    </Badge>
  );
}

/* ---------- Thumb ---------- */
export function Thumb({
  product,
  style,
}: {
  product: Pick<Product, "name" | "color">;
  style?: React.CSSProperties;
}) {
  const initial = (product.name || "?").trim().charAt(0);
  return (
    <div
      className="thumb"
      style={{ background: product.color || "#6f4e37", ...style }}
    >
      <span style={{ fontSize: "inherit" }}>{initial}</span>
    </div>
  );
}

/* ---------- Dialog ---------- */
interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: number;
}
export function Dialog({
  open,
  onClose,
  title,
  children,
  footer,
  width,
}: DialogProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="overlay" onMouseDown={onClose}>
      <div
        className="dialog"
        style={{ maxWidth: width }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 24px 0",
          }}
        >
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 680 }}>{title}</h3>
          <Button
            variant="ghost"
            size="md"
            icon={<Icons.close size={18} />}
            onClick={onClose}
            aria-label="닫기"
          />
        </div>
        <div style={{ padding: "16px 24px 8px" }}>{children}</div>
        {footer && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 10,
              padding: "12px 24px 22px",
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Toast ---------- */
type ToastTone = "default" | "success";
interface ToastItem {
  id: number;
  msg: string;
  tone: ToastTone;
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const push = useCallback((msg: string, tone: ToastTone = "default") => {
    const id = Math.random();
    setToasts((t) => [...t, { id, msg, tone }]);
    setTimeout(() => setToasts((t) => t?.filter((x) => x.id !== id)), 2600);
  }, []);
  const node = (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        zIndex: 80,
        alignItems: "center",
      }}
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          style={{
            background: "#1c1917",
            color: "#fff",
            padding: "11px 18px",
            borderRadius: 999,
            fontSize: 14,
            fontWeight: 540,
            boxShadow: "var(--shadow-lg)",
            display: "flex",
            alignItems: "center",
            gap: 8,
            animation: "pop .2s ease",
          }}
        >
          {t.tone === "success" && (
            <span style={{ color: "#7fe0aa", display: "inline-flex" }}>
              <Icons.check size={16} />
            </span>
          )}
          {t.msg}
        </div>
      ))}
    </div>
  );
  return { push, node };
}

/* ---------- Empty state ---------- */
export function Empty({
  icon,
  title,
  sub,
}: {
  icon: React.ReactNode;
  title: string;
  sub?: string;
}) {
  return (
    <div
      style={{
        padding: "56px 24px",
        textAlign: "center",
        color: "var(--muted)",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          padding: 14,
          borderRadius: 16,
          background: "var(--panel-2)",
          marginBottom: 14,
          color: "var(--border-strong)",
        }}
      >
        {icon}
      </div>
      <div style={{ fontSize: 15, fontWeight: 600, color: "var(--text-2)" }}>
        {title}
      </div>
      {sub && <div style={{ fontSize: 13.5, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}
