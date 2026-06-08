import axios from 'axios';
import { ORDERS, ORDERS2 } from '../../pages/admin/dumpData';

const USE_MOCK = true; // FIXME 백엔드 연동 시 false로 변경

const client = axios.create({
    baseURL: '/api',
    headers: { 'Content-Type': 'application/json' },
  });

// ─── 주문 관리 API ──────────────────────────────────────
export const orderAPI = {
    getAll: async () => {
        if (USE_MOCK) {
            await new Promise((resolve) => setTimeout(resolve, 200));
            return { data: ORDERS };
        }
        return client.get('/admin/orders');
    },
    putState: async (id: number, status: string) => {
        if (USE_MOCK) {
            await new Promise((resolve) => setTimeout(resolve, 200));
            return { data: ORDERS2 }; //테스트 용으로 1번만 수정되도록 진행
        }
        return client.put(`/admin/orders/${id}`, { status });
    },
    getOrderDetail: async (id:number) => {
        if (USE_MOCK) {
            await new Promise((resolve) => setTimeout(resolve, 200));
            return { data: ORDERS.find(o => o.id === id) ?? null }; //테스트 용으로 1번만 수정되도록 진행
        }
        return client.put(`/admin/orders/${id}`);
    }
}