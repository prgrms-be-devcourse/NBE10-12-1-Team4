import { Container, Heading, Text, Box, Card, Flex, Button } from '@radix-ui/themes';
import { useLocation, useNavigate } from 'react-router-dom';

export default function OrderCompletePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as any;

  if (!state || !state.orderDetails) {
    return (
      <Container size="2" py="8" style={{ textAlign: 'center' }}>
        <Heading size="6" mb="4">잘못된 접근입니다.</Heading>
        <Button onClick={() => navigate('/')} color="brown" style={{ cursor: 'pointer' }}>스토어로 돌아가기</Button>
      </Container>
    );
  }

  const { email, address, phone, items, totalPrice, merged, message } = state.orderDetails;

  return (
    <Container size="3" py="8">
      <Box mb="6" style={{ textAlign: 'center' }}>
        <Heading size="8" mb="2" color="brown">
          {merged ? '주문 합배송 완료!' : '주문이 완료되었습니다!'}
        </Heading>
        <Text color="gray" size="4">
          {message}
        </Text>
      </Box>

      <Flex direction="column" gap="5">
        <Card size="3" variant="surface">
          <Heading size="5" mb="3">배송 정보</Heading>
          <Flex direction="column" gap="2">
            <Text><strong>이메일:</strong> {email}</Text>
            <Text><strong>연락처:</strong> {phone}</Text>
            <Text><strong>배송지:</strong> {address}</Text>
          </Flex>
        </Card>

        <Card size="3" variant="surface">
          <Heading size="5" mb="3">구매한 상품</Heading>
          <Box style={{ backgroundColor: 'var(--gray-2)', borderRadius: 'var(--radius-3)' }} p="3">
            {items.map((item: any, index: number) => (
              <Flex justify="between" align="center" mb="3" key={index}>
                <Box>
                  <Text weight="bold" size="3" as="div">{item.name}</Text>
                  <Text color="gray" size="2">{item.price.toLocaleString()}원 x {item.quantity}</Text>
                </Box>
                <Text weight="bold">{(item.price * item.quantity).toLocaleString()}원</Text>
              </Flex>
            ))}
            
            <Box mt="3" pt="3" style={{ borderTop: '1px solid var(--gray-5)' }}>
              <Flex justify="between" align="center">
                <Text weight="bold" size="4">총 결제금액</Text>
                <Text weight="bold" size="5" color="brown">{totalPrice.toLocaleString()}원</Text>
              </Flex>
            </Box>
          </Box>
        </Card>
      </Flex>

      <Flex justify="center" mt="6" gap="3">
        <Button size="3" variant="soft" color="gray" onClick={() => navigate('/track')} style={{ cursor: 'pointer' }}>
          주문 조회하기
        </Button>
        <Button size="3" variant="solid" color="brown" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          쇼핑 계속하기
        </Button>
      </Flex>
    </Container>
  );
}
