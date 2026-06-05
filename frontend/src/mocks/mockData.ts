export const mockProducts = [
  { id: '1', name: '에티오피아 예가체프 G1', price: 18000, roastLevel: 'Light', aroma: '플로럴, 베리, 시트러스' },
  { id: '2', name: '콜롬비아 수프리모', price: 16000, roastLevel: 'Medium', aroma: '초콜릿, 견과류, 캐러멜' },
  { id: '3', name: '과테말라 안티구아', price: 17000, roastLevel: 'Dark', aroma: '스모키, 다크초콜릿' },
  { id: '4', name: '디카페인 멕시코', price: 19000, roastLevel: 'Medium', aroma: '구운 아몬드, 갈색 설탕' },
];

export const mockOrderCreateResponse = {
  id: '101',
  trackingUuid: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  merged: false,
  message: '주문이 성공적으로 접수되었습니다.',
};

export const mockOrderMergeResponse = {
  id: '100',
  trackingUuid: 'existing-uuid-1234-5678',
  merged: true,
  message: '기존 주문에 자동 병합되었습니다.',
};

export const mockOrderDetail = {
  id: '100',
  email: 'buy***@example.com',
  address: '서울시 강남구 ****',
  zipcode: '062**',
  totalPrice: 34000,
  status: 'PENDING',
  deliveryDate: '2026-06-05',
  createdAt: '2026-06-05T10:30:00',
  items: [
    { id: '1', menuName: '에티오피아 예가체프 G1', quantity: 1, unitPrice: 18000 },
    { id: '2', menuName: '콜롬비아 수프리모', quantity: 1, unitPrice: 16000 },
  ],
};
