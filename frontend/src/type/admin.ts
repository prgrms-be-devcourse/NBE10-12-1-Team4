import * as React from "react";

export const STATUSES: OrderStatus[] = ["접수", "준비중", "완료", "취소"];
export type OrderStatus = "접수" | "준비중" | "완료" | "취소";

export type Product = {
  id?: string;
  name: string;
  origin: string;
  weight: number | string;
  price: number;
  description: string;
  img?: string;
  active?: boolean;
  stock: number | string;
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

export type ProductFormProps = {
  isOpen : boolean;
  id: number | null;
  onClose: () => void;
  initial?: Product;
}

export type Order = {
  id: number;
  orderNumber: string;
  email: string;
  price: number;
  time:string;
  status: string;
}

export type OrderItem = {
  id: number;
  name: string;
  price: number;
  stock: number | string;
}

export type OrderDetail = {
  id: number;
  orderNumber: string;
  email: string;
  address: string;
  phone: string;
  price: number;
  time:string;
  orderItems:OrderItem[];
  status: string;
}

export type OrderDetailProps = {
  isOpen : boolean;
  id: number | null;
  onClose: () => void;
}