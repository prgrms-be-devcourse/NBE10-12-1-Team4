"use client";
import { useState } from "react";
import type { MenuItem } from "../../type/admin";
import { Icons } from "./components/icons";
import MenuBar from "./components/MenuBar";
import OrderPage from "./order/Order";
import ProductPage from "./product/Product";
import StaticsPage from "./statics/statics";
import "./styles.css";

const Admin = () => {
  const [tab, setTab] = useState<string | "orders">("orders");

  const items: MenuItem[] = [
    { id: "stats", label: "매출 통계", icon: <Icons.chart size={18} /> },
    { id: "orders", label: "주문 관리", icon: <Icons.receipt size={18} /> },
    { id: "products", label: "원두 관리", icon: <Icons.bean size={18} /> },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <MenuBar
        brand={{
          title: "로스터스 라운지",
          subtitle: "관리자 콘솔",
          icon: <Icons.cup size={17} />,
        }}
        sectionLabel="운영"
        items={items}
        activeId={tab}
        onSelect={(id) => setTab(id)}
        footer={
          <button
            // onClick={() => actions.go("start")}
            className="btn btn-ghost btn-md"
            style={{ width: "100%", justifyContent: "flex-start" }}
          >
            <Icons.logout size={17} /> 시작화면으로
          </button>
        }
      />
      <main
        style={{
          flex: 1,
          padding: "32px 36px",
          maxWidth: tab === "stats" ? 1160 : 1100,
          minWidth: 0,
        }}
      >
        {tab === "stats" ? (
          <StaticsPage />
        ) : tab === "orders" ? (
          <OrderPage />
        ) : (
          <ProductPage />
        )}
      </main>
    </div>
  );
};

export default Admin;
