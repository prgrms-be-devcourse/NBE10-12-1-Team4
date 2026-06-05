import { useEffect, useState } from "react";
import type { Product, ProductFormProps } from "../../type/product";
import { Button, Field } from "../components/ui";

const ProductForm = ({ isOpen, id, onClose, initial }: ProductFormProps) => {
  const [fetched, setFetched] = useState<Product | null>(initial ?? null);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const name = form.elements.namedItem("name") as HTMLInputElement;
    const origin = form.elements.namedItem("origin") as HTMLInputElement;
    const weight = form.elements.namedItem("weight") as HTMLInputElement;
    const price = form.elements.namedItem("price") as HTMLInputElement;
    const stock = form.elements.namedItem("stock") as HTMLInputElement;
    const description = form.elements.namedItem(
      "description"
    ) as HTMLTextAreaElement;
    const img = form.elements.namedItem("img") as HTMLInputElement;
    const imgFile = img.files?.[0];

    name.value = name.value.trim();
    if (name.value.length === 0) {
      alert("원두명을 입력해주세요.");
      name.focus();
      return;
    }

    origin.value = origin.value.trim();
    if (origin.value.length === 0) {
      alert("원산지를 입력해주세요.");
      origin.focus();
      return;
    }

    // const formData = new FormData();
    // formData.append("name", name.value);
    // formData.append("origin", origin.value);
    // formData.append("weight", weight.value);
    // formData.append("price", price.value);
    // formData.append("stock", stock.value);
    // formData.append("description", description.value);
    // if (imgFile) formData.append("img", imgFile);
    //
    // apiFetch(`/api/v1/products${id ? `/${id}` : ""}`, {
    //   method: id ? "PUT" : "POST",
    //   body: formData,
    // }).then((data) => {
    //   alert(data.msg);
    //   onClose();
    // }).catch((error) => {
    //   alert(`${error.resultCode} : ${error.msg}`);
    // });
  };

  useEffect(() => {
    if (!isOpen || !id) {
      setFetched(initial ?? null);
      return;
    }
    //FIXME api 연동시 dumpData 파트는 삭제해 주세요.
    setFetched({ id: "p1",  name: "에티오피아 예가체프", origin: "에티오피아",    stock: 1000,  weight: 200, price: 18000, description: "자스민·베르가못·백도의 화사한 산미", active: false, color: "#a06a3c", img: "/beans/p1.png" })
    // apiFetch(`/api/v1/products/${id}`)
    //   .then((data) => setFetched(data.data))
    //   .catch((error) => alert(`${error.resultCode} : ${error.msg}`));
  }, [id, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onMouseDown={onClose}
    >
      <div
        style={{
          background: "var(--bg, #fff)",
          borderRadius: 12,
          padding: "28px 28px 22px",
          width: "100%",
          maxWidth: 560,
          boxShadow: "var(--shadow-lg)",
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <h3 style={{ margin: "0 0 20px", fontSize: 18, fontWeight: 680 }}>
          {id ? "원두 수정" : "원두 추가"}
        </h3>
        <form key={fetched?.id ?? "new"} onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Field label="원두명">
              <input
                name="name"
                defaultValue={fetched?.name ?? ""}
                placeholder="예) 에티오피아 예가체프"
                autoFocus
              />
            </Field>
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ flex: 1 }}>
                <Field label="원산지">
                  <input
                    name="origin"
                    defaultValue={fetched?.origin ?? ""}
                    placeholder="예) 에티오피아"
                  />
                </Field>
              </div>
              <div style={{ width: 110 }}>
                <Field label="중량 (g)">
                  <input
                    name="weight"
                    type="number"
                    defaultValue={fetched?.weight ?? ""}
                    placeholder="200"
                  />
                </Field>
              </div>
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ flex: 1 }}>
                <Field label="가격 (원)">
                  <input
                    name="price"
                    type="number"
                    defaultValue={fetched?.price ?? ""}
                    placeholder="16000"
                  />
                </Field>
              </div>
              <div style={{ width: 110 }}>
                <Field label="재고 (개)">
                  <input
                    name="stock"
                    type="number"
                    defaultValue={fetched?.stock ?? ""}
                    placeholder="0"
                  />
                </Field>
              </div>
            </div>
            <Field label="테이스팅 노트">
              <textarea
                name="description"
                defaultValue={fetched?.description ?? ""}
                placeholder="예) 카라멜·견과·오렌지의 균형감"
              />
            </Field>
            <Field label="상품 이미지" hint={fetched?.img ? `현재 파일: ${fetched.img}` : undefined}>
              <input name="img" type="file" accept="image/*" />
            </Field>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 10,
              marginTop: 22,
            }}
          >
            <Button type="button" variant="outline" onClick={onClose}>
              취소
            </Button>
            <Button type="submit">저장</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
