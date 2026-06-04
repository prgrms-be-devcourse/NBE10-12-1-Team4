import * as React from "react";

export type OrderStatus = "접수" | "준비중" | "완료" | "취소";

export type Product = {
  name: string;
  color?: string;
};

export type MenuItem = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: number;
  image?: string;
};

export type MenuBarProps = {
  brand?: { title: string; subtitle?: string; icon?: React.ReactNode };
  sectionLabel?: string;
  items: MenuItem[];
  activeId: string;
  onSelect: (id: string) => void;
  footer?: React.ReactNode;
  width?: number;
};
