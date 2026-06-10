import axios from 'axios';
import {
  mockProducts,
  mockOrderCreateResponse,
  mockOrderMergeResponse,
  mockOrderDetail,
} from '../mocks/mockData';

const USE_MOCK = false; // 백엔드 연동 시작!

const client = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

// ─── 상품 API ──────────────────────────────────────
export const productAPI = {
  getAll: async () => {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 500)); // 네트워크 딜레이 시뮬레이션
      return { data: mockProducts };
    }
    return client.get('/admin/products');
  },
};

// ─── 주문 API (고객) ───────────────────────────────
export const orderAPI = {
  create: async (orderData: any) => {
    // 프론트의 productId를 백엔드의 menuId로 변환
    const mappedItems = orderData.items.map((item: any) => ({
      menuId: item.productId,
      quantity: item.quantity
    }));

    const payload = {
      ...orderData,
      items: mappedItems
    };

    return client.post('/guest/orders', payload);
  },

  // 주문 조회 링크 발송 요청
  requestMagicLink: async (email: string) => {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return { data: { message: '인증 링크가 발송되었습니다.' } };
    }
    return client.post('/orders/track/request', { email });
  },

  // OTP 인증
  verifyOtp: async (token: string, otp: string) => {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (otp === '123456') return { data: { verified: true, sessionToken: 'mock-session' } };
      return Promise.reject({ response: { status: 401, data: { message: 'OTP가 일치하지 않습니다.' } } });
    }
    return client.post('/orders/track/verify', { token, otp });
  },

  // 인증 후 주문 상세 조회
  getDetail: async (sessionToken: string) => {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return { data: mockOrderDetail };
    }
    return client.post('/orders/track/detail', { sessionToken });
  },

  // 이메일 기반 주문 전체 내역 조회 (Guest)
  getOrdersByEmail: async (email: string) => {
    return client.get(`/guest/orders?email=${email}`);
  },
};
