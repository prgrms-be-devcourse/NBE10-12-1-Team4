import { useEffect, useState } from "react";
import { TextField } from "@radix-ui/themes";
import type { Product, ProductFormProps } from "../../../type/admin";
import { adminProductAPI } from "../../../services/admin/api";
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

    const weightNum = Number(weight.value);
    if (weight.value.trim() === "" || isNaN(weightNum)) {
      alert("중량은 숫자로 입력해주세요.");
      weight.focus();
      return;
    }
    if (weightNum < 0) {
      alert("중량은 0 이상으로 입력해주세요.");
      weight.focus();
      return;
    }

    const priceNum = Number(price.value);
    if (price.value.trim() === "" || isNaN(priceNum)) {
      alert("가격은 숫자로 입력해주세요.");
      price.focus();
      return;
    }
    if (priceNum < 0) {
      alert("가격은 0 이상으로 입력해주세요.");
      price.focus();
      return;
    }

    const stockNum = Number(stock.value);
    if (stock.value.trim() === "" || isNaN(stockNum)) {
      alert("재고는 숫자로 입력해주세요.");
      stock.focus();
      return;
    }
    if (stockNum < 0) {
      alert("재고는 0 이상으로 입력해주세요.");
      stock.focus();
      return;
    }

    const formData = new FormData();
    formData.append("name", name.value);
    formData.append("origin", origin.value);
    formData.append("weight", weight.value);
    formData.append("price", price.value);
    formData.append("stock", stock.value);
    formData.append("description", description.value);
    if (imgFile) formData.append("img", imgFile);

    const api = id
      ? adminProductAPI.update(id, formData)
      : adminProductAPI.create(formData);

    api
      .then(() => {
        alert("저장되었습니다.");
        onClose();
      })
      .catch(() => alert("저장에 실패했습니다."));
  };

  useEffect(() => {
    if (!isOpen || !id) {
      setFetched(initial ?? null);
      return;
    }
    adminProductAPI.getDetail(id).then((res) => {
      setFetched(res?.data);
    });
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
            <Field
              label="원두명"
              children={
                <TextField.Root
                  name="name"
                  defaultValue={fetched?.name ?? ""}
                  placeholder="예) 에티오피아 예가체프"
                  autoFocus
                />
              }
            />
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ flex: 1 }}>
                <Field
                  label="원산지"
                  children={
                    <TextField.Root
                      name="origin"
                      defaultValue={fetched?.origin ?? ""}
                      placeholder="예) 에티오피아"
                    />
                  }
                />
              </div>
              <div style={{ width: 110 }}>
                <Field
                  label="중량 (g)"
                  children={
                    <TextField.Root
                      name="weight"
                      type="number"
                      defaultValue={fetched?.weight ?? ""}
                      placeholder="200"
                    />
                  }
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ flex: 1 }}>
                <Field
                  label="가격 (원)"
                  children={
                    <TextField.Root
                      name="price"
                      type="number"
                      defaultValue={fetched?.price ?? ""}
                      placeholder="16000"
                    />
                  }
                />
              </div>
              <div style={{ width: 110 }}>
                <Field
                  label="재고 (개)"
                  children={
                    <TextField.Root
                      name="stock"
                      type="number"
                      defaultValue={fetched?.stock ?? ""}
                      placeholder="0"
                    />
                  }
                />
              </div>
            </div>
            <Field
              label="테이스팅 노트"
              children={
                <TextField.Root
                  name="description"
                  defaultValue={fetched?.description ?? ""}
                  placeholder="예) 카라멜·견과·오렌지의 균형감"
                  size="3"
                />
              }
            />

            <Field
              label="상품 이미지"
              hint={fetched?.img ? `현재 파일: ${fetched.img}` : undefined}
              children={<input name="img" type="file" accept="image/*" />}
            />
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
