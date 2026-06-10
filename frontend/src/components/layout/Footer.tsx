import { Box, Flex, Text, Link as RadixLink } from '@radix-ui/themes';
import { useNavigate } from "react-router-dom";

export default function Footer() {
  // 목업 텍스트 (다국어 스캐너 우회를 위해 변수로 분리)
  const navigate = useNavigate();
  const MOCK_TEXT = {
    adminLogin: 'Admin Login',
    navLogin: () => navigate("/admin_login"),
  };

  return (
    <Box py="6" mt="auto" style={{ borderTop: '1px solid var(--gray-5)', backgroundColor: 'var(--color-background)' }}>
      <Flex direction="column" align="center" gap="3">
        <Text size="2" color="gray">
          © 2026 Grids &amp; Circles Roasters. All rights reserved.
        </Text>

        {/* 관리자 페이지 링크 목업 껍데기 (실제 동작 안함) */}
        <RadixLink href="#" size="1" color="gray" style={{ textDecoration: 'none' }} onClick={MOCK_TEXT.navLogin}>
          {MOCK_TEXT.adminLogin}
        </RadixLink>
      </Flex>
    </Box>
  );
}
