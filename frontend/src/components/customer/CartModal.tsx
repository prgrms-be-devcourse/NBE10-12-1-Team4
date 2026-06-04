import { Dialog, Button, Flex, Text, TextField, Box } from '@radix-ui/themes';

export default function CartModal() {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button size="3" variant="solid" color="brown" style={{ cursor: 'pointer' }}>
          장바구니 및 결제
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="500px">
        <Dialog.Title>장바구니 확인</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          선택하신 상품을 확인하고 배송 정보를 입력해 주세요.
        </Dialog.Description>

        <Flex direction="column" gap="4">
          {/* 장바구니 목록 (임시) */}
          <Box p="3" style={{ backgroundColor: 'var(--gray-2)', borderRadius: 'var(--radius-3)' }}>
            <Flex justify="between" mb="2">
              <Text weight="bold">에티오피아 예가체프</Text>
              <Text>1개</Text>
            </Flex>
            <Flex justify="between">
              <Text weight="bold">콜롬비아 수프리모</Text>
              <Text>1개</Text>
            </Flex>
            <Box mt="3" pt="3" style={{ borderTop: '1px solid var(--gray-5)' }}>
              <Flex justify="between">
                <Text weight="bold" size="4">총 결제금액</Text>
                <Text weight="bold" size="4" color="brown">34,000원</Text>
              </Flex>
            </Box>
          </Box>

          {/* 배송 정보 입력 폼 */}
          <Box mt="2">
            <Text as="div" size="2" mb="1" weight="bold">이메일 (합배송 기준)</Text>
            <TextField.Root placeholder="buyer@example.com" type="email" />
          </Box>
          <Box>
            <Text as="div" size="2" mb="1" weight="bold">배송지 주소</Text>
            <TextField.Root placeholder="서울시 강남구 테헤란로..." />
          </Box>
          <Box>
            <Text as="div" size="2" mb="1" weight="bold">연락처</Text>
            <TextField.Root placeholder="010-0000-0000" />
          </Box>
        </Flex>

        <Flex gap="3" mt="6" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray" style={{ cursor: 'pointer' }}>
              취소
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button variant="solid" color="brown" style={{ cursor: 'pointer' }}>
              주문하기
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
