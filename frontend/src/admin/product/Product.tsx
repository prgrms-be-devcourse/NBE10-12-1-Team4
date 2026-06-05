import { useState } from "react";
import type { Product } from "../../type/product";
import { Icons } from "../components/icons";
import { PageHead } from "../components/PageHead";
import { Badge, Button, Empty, Thumb } from "../components/ui";
import { BEANS } from "../dumpData";
import ProductForm from "./ProductForm";

const ProductPage = () => {
  const [products, _setProducts] = useState<Product[] | null>(BEANS);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [detailId, setDetailId] = useState<number | null>(null);
  const fmt = (n: number, suffix = "") => n.toLocaleString("ko-KR") + suffix;

  const formModal = (type:string, id:number|null = null) => {
    setDetailId(type === 'edit' ? id : null)
    setIsOpen(true)
  }

  const confirmDel = (id:number, onSuccess: () => void) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    // apiFetch(`/api/v1/posts/${id}?actorId=3`, {
    //   method: "DELETE",
    // }).then(onSuccess);
  }

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
                    {p.active ? (
                      <Badge tone="red" dot>
                        품절
                      </Badge>
                    ) : (
                      <Badge tone="green" dot>
                        판매중
                      </Badge>
                    )}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: 6 }}>
                      <Button
                        variant="outline"
                        size="sm"
                        // onClick={() => actions.toggleSoldOut(p.id)}
                      >
                        {p.active ? "판매 재개" : "품절 처리"}
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
      onClose={() => { setIsOpen(false); setDetailId(null); }}
      id={detailId}
    />
    </>
  );
};

export default ProductPage;
