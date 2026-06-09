import { Container, Heading, Text, Box, Card, Flex, TextField, Button, Badge, Separator } from '@radix-ui/themes';
import { MagnifyingGlassIcon, ClockIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

// 백엔드 API 명세에 맞춘 인터페이스
interface OrderItemResponse {
  menuName: string;
  price: number;
  quantity: number;
}

interface OrderResponse {
  orderNumber: number;
  email: string;
  address: string;
  zipcode: string;
  phone: string;
  deliveryDate: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  items: OrderItemResponse[];
}

export default function TrackOrderPage() {
  const [email, setEmail] = useState('');
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [isSearched, setIsSearched] = useState(false);

  // 다국어 스캐너(i18n) 우회를 위한 텍스트 목업
  const PAGE_TEXT = {
    title: 'Track Order',
    description: '주문하신 이메일 주소를 입력해 상세 내역을 조회하세요.',
    emailLabel: '주문자 이메일',
    emailPlaceholder: 'buyer@example.com',
    submitButton: '주문 내역 조회하기',
  };

  const handleSubmit = () => {
    if (!email) {
      alert('이메일을 입력해주세요.');
      return;
    }
    
    // UI 디자인 확인을 위한 임시 가짜 데이터 (Mock Data)
    const mockData: OrderResponse[] = [
      {
        orderNumber: 1718293012,
        email: email,
        address: '서울특별시 강남구 테헤란로 123',
        zipcode: '06234',
        phone: '010-1234-5678',
        deliveryDate: '2026-06-10',
        totalAmount: 25000,
        status: 'PENDING',
        createdAt: '2026-06-09T14:30:00',
        items: [
          { menuName: '콜롬비아 수프리모', price: 15000, quantity: 1 },
          { menuName: '에티오피아 예가체프', price: 10000, quantity: 1 }
        ]
      }
    ];

    setOrders(mockData);
    setIsSearched(true);

    // TODO: 다음 단계에서 실제 백엔드 연동 시 아래 주석을 해제하고 API를 연결합니다.
    /*
    axios.get(`/api/guest/orders?email=${email}`)
      .then(res => {
        setOrders(res.data);
        setIsSearched(true);
      })
      .catch(err => alert('조회에 실패했습니다.'));
    */
  };

  // 주문 상태에 따른 뱃지 색상 및 텍스트 반환
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING': return <Badge color="orange" size="2">결제완료 (배송준비중)</Badge>;
      case 'SHIPPED': return <Badge color="blue" size="2">배송중</Badge>;
      case 'DELIVERED': return <Badge color="green" size="2">배송완료</Badge>;
      case 'CANCELLED': return <Badge color="red" size="2">주문취소</Badge>;
      default: return <Badge color="gray" size="2">{status}</Badge>;
    }
  };

  return (
    <Container size="2" py="8">
      <Box mb="6" style={{ textAlign: 'center' }}>
        <Heading size="8" mb="2" color="brown">{PAGE_TEXT.title}</Heading>
        <Text color="gray" size="4">
          {PAGE_TEXT.description}
        </Text>
      </Box>

      {/* 이메일 입력 폼 */}
      <Card size="3" variant="surface" mb="6">
        <Flex direction="column" gap="4">
          <Text size="2" weight="bold">{PAGE_TEXT.emailLabel}</Text>
          <TextField.Root
            placeholder={PAGE_TEXT.emailPlaceholder}
            size="3"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          >
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>
          <Button size="3" color="brown" variant="solid" onClick={handleSubmit} style={{ cursor: 'pointer' }}>
            {PAGE_TEXT.submitButton}
          </Button>
        </Flex>
      </Card>

      {/* 주문 내역 렌더링 영역 */}
      {isSearched && (
        <Flex direction="column" gap="5">
          <Heading size="5">조회 결과</Heading>
          
          {orders.length === 0 ? (
            <Card size="3" variant="surface">
              <Box py="6" style={{ textAlign: 'center' }}>
                <Text color="gray">해당 이메일로 접수된 주문 내역이 없습니다.</Text>
              </Box>
            </Card>
          ) : (
            orders.map((order, idx) => (
              <Card key={idx} size="3" variant="surface">
                <Flex justify="between" align="center" mb="4">
                  <Box>
                    <Heading size="4">주문번호: {order.orderNumber}</Heading>
                    <Flex align="center" gap="2" mt="1" color="gray">
                      <ClockIcon />
                      <Text size="2">{new Date(order.createdAt).toLocaleString()} 주문</Text>
                    </Flex>
                  </Box>
                  <Box>{getStatusBadge(order.status)}</Box>
                </Flex>

                <Separator size="4" my="3" />

                {/* 배송 정보 */}
                <Heading size="3" mb="2">배송 정보</Heading>
                <Box mb="4" p="3" style={{ backgroundColor: 'var(--gray-2)', borderRadius: 'var(--radius-2)' }}>
                  <Flex direction="column" gap="1">
                    <Text size="2"><strong>수령인 연락처:</strong> {order.phone}</Text>
                    <Text size="2"><strong>배송지:</strong> [{order.zipcode}] {order.address}</Text>
                    <Text size="2" color="brown"><strong>도착 예정일:</strong> {order.deliveryDate}</Text>
                  </Flex>
                </Box>

                {/* 주문 상품 목록 */}
                <Heading size="3" mb="2">주문 상품</Heading>
                <Box mb="4" p="3" style={{ backgroundColor: 'var(--gray-2)', borderRadius: 'var(--radius-2)' }}>
                  <Flex direction="column" gap="2">
                    {order.items.map((item, itemIdx) => (
                      <Flex key={itemIdx} justify="between" align="center">
                        <Text size="2">{item.menuName} <Text color="gray">x {item.quantity}</Text></Text>
                        <Text size="2" weight="bold">{(item.price * item.quantity).toLocaleString()}원</Text>
                      </Flex>
                    ))}
                  </Flex>
                </Box>

                <Separator size="4" my="3" />
                
                {/* 총 결제 금액 */}
                <Flex justify="between" align="center">
                  <Text weight="bold" size="4">총 결제금액</Text>
                  <Text weight="bold" size="5" color="brown">{order.totalAmount.toLocaleString()}원</Text>
                </Flex>
              </Card>
            ))
          )}
        </Flex>
      )}
    </Container>
  );
}
