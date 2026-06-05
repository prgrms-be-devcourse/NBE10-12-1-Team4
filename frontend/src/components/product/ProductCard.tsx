import { Card, Inset, Text, Button, Flex, Badge, Box } from '@radix-ui/themes';
import { PlusIcon } from '@radix-ui/react-icons';
import { useCart } from '../../store/CartContext';

export interface ProductProps {
  id: string;
  name: string;
  price: number;
  roastLevel: string;
  aroma: string;
}

export default function ProductCard({ id, name, price, roastLevel, aroma }: ProductProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(id);
    // 선택 사항: 여기에 토스트 알림을 추가할 수 있습니다.
  };

  return (
    <Card size="2" className="product-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Inset clip="padding-box" side="top" pb="current">
        <div style={{ height: '220px', backgroundColor: 'var(--gray-3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Text color="gray" size="2">원두 이미지</Text>
        </div>
      </Inset>
      
      <Flex direction="column" mt="3" style={{ flexGrow: 1 }}>
        <Flex justify="between" align="start" gap="2" mb="2">
          <Text weight="bold" size="4" style={{ lineHeight: '1.3' }}>{name}</Text>
          <Badge color="brown" radius="full" style={{ whiteSpace: 'nowrap' }}>{roastLevel}</Badge>
        </Flex>
        
        <Box style={{ flexGrow: 1 }}>
          <Text color="gray" size="2" as="div" style={{ minHeight: '40px' }}>
            노트: {aroma}
          </Text>
        </Box>
        
        <Flex justify="between" align="center" mt="4">
          <Text weight="bold" size="4">{price.toLocaleString()}원</Text>
          <Button 
            size="2" 
            variant="solid" 
            color="brown" 
            style={{ cursor: 'pointer', transition: 'all 0.2s' }}
            onClick={handleAddToCart}
          >
            <PlusIcon /> 담기
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
}
