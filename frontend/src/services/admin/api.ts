import axios from "axios";
import { BEANS, ORDERS, ORDERS2, STATS } from "../../pages/admin/dumpData";

let mockBeans = [...BEANS];

const USE_MOCK = false;

const client = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: { "Content-Type": "application/json" },
});

// ─── 주문 관리 API ──────────────────────────────────────
export const orderAPI = {
  getAll: async () => {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return { data: ORDERS };
    }
    return client.get("/admin/orders");
  },
  putState: async (id: number, state: string) => {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return { data: ORDERS2 }; //테스트 용으로 1번만 수정되도록 진행
    }
    return client.put(`/admin/orders/${id}`, { state });
  },
  getOrderDetail: async (id: number) => {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return { data: ORDERS.find((o) => o.id === id) ?? null }; //테스트 용으로 1번만 수정되도록 진행
    }
    return client.put(`/admin/orders/${id}`);
  },
};

// ─── 원두 관리 API ──────────────────────────────────────
export const adminProductAPI = {
  getAll: async () => {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return { data: mockBeans };
    }
    return client.get(`/admin/products`);
  },
  create: async (formData: FormData) => {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return { data: null };
    }
    return client.post(`/admin/products`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  getDetail: async (id: number) => {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return { data: BEANS.find((o) => o.id === id) ?? null };
    }
    return client.get(`/admin/products/${id}`);
  },
  update: async (id: number, formData: FormData) => {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return { data: null };
    }
    return client.put(`/admin/products/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  delete: async (id: number) => {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      mockBeans = mockBeans.filter(o => o.id !== String(id));
      return { data: mockBeans };
    }
    return client.delete(`/admin/products/${id}`);
  },
  putState: async (id: number, active: boolean) => {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      mockBeans = mockBeans.map(o => o.id === id ? { ...o, active } : o);
      return { data: mockBeans };
    }
    return client.put(`/admin/products/${id}/state`, { active });
  }
};

// ─── 매출 통계 API ──────────────────────────────────────
export const staticsAPI = {
  getRange : async () => {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return { data: STATS.days };
    }
    return client.get(`/admin/statistics/range`);
  },
  getBeans : async () => {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return { data: STATS.beans };
    }
    return client.get(`/admin/statistics/bean`);
  },
}