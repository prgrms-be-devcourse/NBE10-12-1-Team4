import axios from 'axios';
import {
  mockProducts,
  mockOrderCreateResponse,
  mockOrderMergeResponse,
  mockOrderDetail,
} from '../mocks/mockData';

const USE_MOCK = true; // 백엔드 연동 시 false로 변경

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
    return client.get('/products');
  },
};

// ─── 주문 API (고객) ───────────────────────────────
export const orderAPI = {
  create: async (orderData: any) => {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      // buyer@example.com인 경우 합배송 상황 시뮬레이션
      const isMerge = orderData.email === 'buyer@example.com';
      return { data: isMerge ? mockOrderMergeResponse : mockOrderCreateResponse };
    }
    return client.post('/orders', orderData);
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
};
