import { useEffect, useState } from "react";
import { adminProductAPI } from "../../../services/admin/api";
import type { Product } from "../../../type/admin";
import { Icons } from "../components/icons";
import { PageHead } from "../components/PageHead";
import { Badge, Button, Empty, Thumb } from "../components/ui";
import { BEANS } from "../dumpData";
import ProductForm from "./ProductForm";

const ProductPage = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [detailId, setDetailId] = useState<number | null>(null);
  const fmt = (n: number, suffix = "") => n.toLocaleString("ko-KR") + suffix;

  const formModal = (type:string, id:number|null = null) => {
    setDetailId(type === 'edit' ? id : null)
    setIsOpen(true)
  }

  const confirmDel = (id:number) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    adminProductAPI.delete(id).then(() => {
      alert("삭제되었습니다.")
      getInit();
    })
  }

  const setActiveState = (id: number, active: boolean) => {
    adminProductAPI.putState(id, !active).then(() => {
      getInit();
    }).catch(() => alert("변경 실패했습니다."));
  }

  const getInit = () => {
    adminProductAPI.getAll().then((res) => {
      setProducts(res?.data)
    })
  }

  useEffect(() => {
    getInit()
  }, [])

  return (
    <>
    <div>
      <PageHead
        title="원두 관리"
        sub="원두를 추가·수정하고 재고(품절) 상태를 관리하세요."
        action={<Button icon={<Icons.plus size={17} />} onClick={() => formModal("save")}>원두 추가</Button>}
      />
      <div className="card">
        {products === null ? (
          <Empty
            icon={<Icons.bean size={26} />}
            title="원두가 없습니다"
            sub="새 원두를 추가해 보세요."
          />
        ) : (
          <table className="tbl">
            <thead>
              <tr>
                <th style={{ width: 60 }}></th>
                <th>원두명</th>
                <th>원산지</th>
                <th>가격</th>
                <th>재고</th>
                <th>상태</th>
                <th style={{ textAlign: "center" }}>관리</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((p) => (
                <tr key={p.id}>
                  <td>
                    <Thumb
                      product={p}
                      style={{
                        width: 40,
                        height: 40,
                        fontSize: 17,
                        borderRadius: 9,
                      }}
                    />
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{p.name}</div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "var(--muted)",
                        maxWidth: 240,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {p.description}
                    </div>
                  </td>
                  <td style={{ color: "var(--text-2)", whiteSpace: "nowrap" }}>
                    {p.origin}
                  </td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    <span style={{ fontWeight: 640 }}>{fmt(p.price, "원")}</span>
                    <span style={{ fontSize: 12, color: "var(--muted)" }}>
                      {" "}
                      /{p.weight}g
                    </span>
                  </td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    <span style={{ fontWeight: 640 }}>{fmt(p?.stock ?? 0)}</span>
                    <span style={{ fontSize: 12, color: "var(--muted)" }}>
                      {" "}
                      /개
                    </span>
                  </td>
                  <td>
                    {!p.active ? (
                      <Badge tone="red" dot children="품절"/>
                    ) : (
                      <Badge tone="green" dot children="판매중"/>
                    )}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: 6 }}>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setActiveState(p.id, p.active ?? false)}
                      >
                        {!p.active ? "판매 재개" : "품절 처리"}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="btn-icon"
                        icon={<Icons.edit size={16} />}
                        onClick={() => formModal("edit", p.id)}
                        aria-label="수정"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="btn-icon"
                        icon={<Icons.trash size={16} />}
                        onClick={() => confirmDel(p.id)}
                        aria-label="삭제"
                        style={{ color: "var(--red)" }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
    <ProductForm
      isOpen={isOpen}
      onClose={() => { setIsOpen(false); setDetailId(null); getInit(); }}
      id={detailId}
    />
    </>
  );
};

export default ProductPage;
