import { useEffect, useState } from "react";
import { Card, Dialog } from "@radix-ui/themes";
import OrderDetail from "./OrderDetail";
import type { Order } from "../../../type/admin";
import { STATUSES, STATUS_LABEL } from "../../../type/admin";
import { Icons } from "../components/icons";
import { PageHead } from "../components/PageHead";
import { Empty, StatusBadge } from "../components/ui";
import { SearchInput } from "../components/SearchInput";
import { orderAPI } from "../../../services/admin/api";

const OrderPage = () => {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [q, setQ] = useState("");
  const [detail, setDetail] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const fmt = (n: number, suffix = "") => n.toLocaleString("ko-KR") + suffix;
  // new Date(batchDeadline).toLocaleString()

  const closeDetail = () => {
    setDetail(null)
    setIsOpen(false)
  }

  const changeState = (id: number, status: string) => {
    orderAPI.putState(id, status).then(() => {
      getInit()
    })
  }

  const getInit = () => {
    orderAPI.getAll("admin").then((res) => {
      setOrders(res?.data)
    })
  }

  useEffect(() => {
    getInit()
  }, [])

  return (
    <div>
      <PageHead
        title="주문 관리"
        sub="들어오는 주문을 확인하고 상태를 변경하세요."
      />
      <Card style={{ paddingLeft: 0, paddingRight: 0 }}>
      <div
          style={{
            padding: 14,
            display: "flex",
            gap: 12,
            alignItems: "center",
            borderBottom: "1px solid var(--border)",
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: 1, minWidth: 220 }}>
            <SearchInput
              value={q}
              onChange={setQ}
              placeholder="이메일"
            />
          </div>
        </div>
        {orders === null ? (
                    <Empty
                        icon={<Icons.receipt size={26} />}
                        title="주문이 없습니다"
                        sub="조건에 맞는 주문이 없어요."
                    />
                ): (
        <table className="tbl">
          <thead>
            <tr>
              <th>주문번호</th>
              <th style={{ width: 250 }}>고객</th>
              <th style={{ width: 170 }}>금액</th>
              <th style={{ width: 190 }}>시간</th>
              <th style={{ width: 190 }}>배달 날짜</th>
              <th>상태</th>
              <th style={{ textAlign: "center" }}>관리</th>
            </tr>
          </thead>
          <tbody>
              {orders?.map((o) => (
                <tr
                  key={o.orderNumber}
                  style={{ cursor: "pointer" }}
                  onClick={() => { setDetail(o.orderNumber); setIsOpen(true); }}
                >
                  <td className="mono">
                    {o.orderNumber}
                  </td>
                  <td>{o.email}</td>
                  <td>{fmt(o.totalAmount, "원")}</td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    {new Date(o.createdAt).toLocaleString("ko-KR")}
                  </td>
                  <td>{o.deliveryDate}</td>
                  <td>
                    <StatusBadge status={o.status} />
                  </td>
                  <td
                    onClick={(e) => e.stopPropagation()}
                    style={{ textAlign: "right" }}
                  >
                    <select
                      className="select"
                      style={{
                        height: 32,
                        fontSize: 13,
                        width: 104,
                        display: "inline-block",
                      }}
                      value={o.status}
                      onChange={(e) => changeState(o.orderNumber, e.target.value)}
                    >
                      {STATUSES?.map((st) => (
                        <option key={st} value={st}>
                          {STATUS_LABEL[st]}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
        )
            }
      </Card>
      <Dialog.Root open={isOpen} onOpenChange={(open) => { if (!open) setIsOpen(false); }}>
        <OrderDetail isOpen={isOpen} id={detail} onClose={() => closeDetail()} />
      </Dialog.Root>
    </div>
  );
};
export default OrderPage;
