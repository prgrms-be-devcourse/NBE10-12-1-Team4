import { Container, Heading, Text, Box, Grid, Flex } from '@radix-ui/themes';
import ProductCard from '../../components/product/ProductCard';
import CartDrawer from '../../components/cart/CartDrawer';

const DUMMY_PRODUCTS = [
  { id: '1', name: '에티오피아 예가체프 G1', price: 18000, roastLevel: 'Light', aroma: '플로럴, 베리, 시트러스' },
  { id: '2', name: '콜롬비아 수프리모', price: 16000, roastLevel: 'Medium', aroma: '초콜릿, 견과류, 캐러멜' },
  { id: '3', name: '과테말라 안티구아', price: 17000, roastLevel: 'Dark', aroma: '스모키, 다크초콜릿' },
  { id: '4', name: '디카페인 멕시코', price: 19000, roastLevel: 'Medium', aroma: '구운 아몬드, 갈색 설탕' },
];

export default function StorePage() {
  return (
    <Container size="4" py="8">
      {/* 헤더 및 장바구니 버튼 영역 */}
      <Flex justify="between" align="center" mb="6">
        <Box>
          <Heading size="8" mb="2">Store</Heading>
          <Text color="gray" size="4">
            최상급 스페셜티 원두를 당일 로스팅하여 전해드립니다.
          </Text>
        </Box>
        <CartDrawer />
      </Flex>
      
      {/* 원두 상품 목록 그리드 */}
      <Grid columns={{ initial: '1', sm: '2', md: '3', lg: '4' }} gap="5" p="2">
        {DUMMY_PRODUCTS.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            roastLevel={product.roastLevel}
            aroma={product.aroma}
          />
        ))}
      </Grid>
    </Container>
  );
}
