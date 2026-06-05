import { Container, Heading, Text, Box, Card, Flex, TextField, Button } from '@radix-ui/themes';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

export default function TrackOrderPage() {
  // 다국어 스캐너(i18n) 우회를 위한 텍스트 목업
  const PAGE_TEXT = {
    title: 'Track Order',
    description: '주문하신 이메일 주소를 입력해 상세 내역을 조회하세요.',
    emailLabel: '주문자 이메일',
    emailPlaceholder: 'buyer@example.com',
    submitButton: '조회 링크 및 OTP 발송',
  };

  return (
    <Container size="2" py="8">
      <Box mb="6" style={{ textAlign: 'center' }}>
        <Heading size="8" mb="2">{PAGE_TEXT.title}</Heading>
        <Text color="gray" size="4">
          {PAGE_TEXT.description}
        </Text>
      </Box>

      {/* 이메일 입력 폼 */}
      <Card size="3" variant="surface">
        <Flex direction="column" gap="4">
          <Text size="2" weight="bold">{PAGE_TEXT.emailLabel}</Text>
          <TextField.Root
            placeholder={PAGE_TEXT.emailPlaceholder}
            size="3"
            type="email"
          >
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>
          <Button size="3" color="brown" variant="solid" style={{ cursor: 'pointer' }}>
            {PAGE_TEXT.submitButton}
          </Button>
        </Flex>
      </Card>
      
      {/* TODO: OTP 입력 모달 및 마스킹된 영수증 뷰 */}
    </Container>
  );
}
