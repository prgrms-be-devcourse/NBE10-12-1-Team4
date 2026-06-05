import { Flex, Heading, Link as RadixLink, Box } from '@radix-ui/themes';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const getLinkStyle = (path: string) => {
    return location.pathname === path
      ? { fontWeight: 'bold', color: 'var(--accent-9)' } // 활성화된 탭
      : { color: 'var(--gray-11)' };                     // 비활성화된 탭
  };

  return (
    <Box
      py="4"
      px="6"
      style={{
        borderBottom: '1px solid var(--gray-a4)',
        backgroundColor: 'var(--color-background)',
      }}
    >
      <Flex align="center" justify="between" maxWidth="1200px" mx="auto">
        {/* 로고 영역 */}
        <Heading size="6" weight="bold" style={{ letterSpacing: '-0.5px' }}>
          <RadixLink asChild style={{ color: 'var(--gray-12)', textDecoration: 'none' }}>
            <Link to="/">Grids &amp; Circles</Link>
          </RadixLink>
        </Heading>

        {/* 네비게이션 링크 영역 */}
        <Flex gap="6" align="center">
          <RadixLink asChild style={{ textDecoration: 'none', ...getLinkStyle('/') }}>
            <Link to="/">원두 스토어</Link>
          </RadixLink>
          <RadixLink asChild style={{ textDecoration: 'none', ...getLinkStyle('/track') }}>
            <Link to="/track">주문 조회</Link>
          </RadixLink>
        </Flex>
      </Flex>
    </Box>
  );
}
