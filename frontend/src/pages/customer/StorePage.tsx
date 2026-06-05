import { Container, Heading, Text, Box, Grid, Flex, Spinner } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import ProductCard from '../../components/product/ProductCard';
import CartDrawer from '../../components/cart/CartDrawer';
import { productAPI } from '../../services/api';

export default function StorePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productAPI.getAll().then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  }, []);

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
      {loading ? (
        <Flex justify="center" p="9">
          <Spinner size="3" />
        </Flex>
      ) : (
        <Grid columns={{ initial: '1', sm: '2', md: '3', lg: '4' }} gap="5" p="2">
          {products.map((product) => (
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
      )}
    </Container>
  );
}
