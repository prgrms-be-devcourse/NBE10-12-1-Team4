import { Card, Inset, Text, Button, Flex, Badge } from '@radix-ui/themes';
import { PlusIcon } from '@radix-ui/react-icons';

export interface ProductProps {
  id: string;
  name: string;
  price: number;
  roastLevel: string;
  aroma: string;
}

export default function ProductCard({ id, name, price, roastLevel, aroma }: ProductProps) {
  return (
    <Card size="2">
      <Inset clip="padding-box" side="top" pb="current">
        <div style={{ height: '200px', backgroundColor: 'var(--gray-3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Text color="gray" size="2">원두 이미지</Text>
        </div>
      </Inset>
      <Flex direction="column" gap="2" mt="3">
        <Flex justify="between" align="center">
          <Text weight="bold" size="4">{name}</Text>
          <Badge color="brown">{roastLevel}</Badge>
        </Flex>
        <Text color="gray" size="2">노트: {aroma}</Text>
        <Text weight="bold" size="3" mt="2">{price.toLocaleString()}원</Text>
        
        <Button size="2" variant="soft" color="brown" mt="3" style={{ cursor: 'pointer' }}>
          <PlusIcon /> 장바구니 담기
        </Button>
      </Flex>
    </Card>
  );
}
