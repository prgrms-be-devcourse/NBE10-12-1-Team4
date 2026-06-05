import { Dialog, Button, Flex, Text, TextField, Box, IconButton, Spinner } from '@radix-ui/themes';
import { MinusIcon, PlusIcon, Cross2Icon } from '@radix-ui/react-icons';
import { useState, useEffect } from 'react';
import { useCart } from '../../store/CartContext';
import { productAPI, orderAPI } from '../../services/api';

export default function CartDrawer() {
  const { items, updateQuantity, removeItem, clear, totalCount } = useCart();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 주문 폼 상태
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  // 장바구니에서 상품 단가/이름을 매핑하기 위해 전체 상품 목록을 가져옴
  useEffect(() => {
    productAPI.getAll().then((res) => setProducts(res.data));
  }, []);

  const getProductDetail = (productId: string) => {
    return products.find(p => p.id === productId) || { name: '알 수 없는 상품', price: 0 };
  };

  const totalPrice = items.reduce((sum, item) => {
    const p = getProductDetail(item.productId);
    return sum + (p.price * item.quantity);
  }, 0);

  const handleCheckout = async () => {
    if (items.length === 0) {
      alert('장바구니가 비어있습니다.');
      return;
    }
    if (!email || !address) {
      alert('필수 배송 정보를 입력해주세요.');
      return;
    }

    setLoading(true);
    try {
      const res = await orderAPI.create({ email, address, phone, items });
      const { merged, message } = res.data;
      
      clear(); // 결제 성공 시 장바구니 비우기
      
      if (merged) {
        alert(`[합배송 완료]\n${message}`);
      } else {
        alert(`[주문 완료]\n${message}`);
      }
      
    } catch (error) {
      alert('주문 처리 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };
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
          {/* 장바구니 목록 */}
          <Box p="3" style={{ backgroundColor: 'var(--gray-2)', borderRadius: 'var(--radius-3)' }}>
            {items.length === 0 ? (
              <Text color="gray" size="2">장바구니가 비어있습니다.</Text>
            ) : (
              items.map((item) => {
                const detail = getProductDetail(item.productId);
                return (
                  <Flex justify="between" align="center" mb="3" key={item.productId}>
                    <Box>
                      <Text weight="bold" size="3" as="div">{detail.name}</Text>
                      <Text color="gray" size="2">{detail.price.toLocaleString()}원</Text>
                    </Box>
                    <Flex align="center" gap="3">
                      <Flex align="center" gap="2">
                        <IconButton size="1" variant="soft" onClick={() => updateQuantity(item.productId, item.quantity - 1)} disabled={item.quantity <= 1}>
                          <MinusIcon />
                        </IconButton>
                        <Text>{item.quantity}</Text>
                        <IconButton size="1" variant="soft" onClick={() => updateQuantity(item.productId, item.quantity + 1)}>
                          <PlusIcon />
                        </IconButton>
                      </Flex>
                      <IconButton size="1" color="red" variant="ghost" onClick={() => removeItem(item.productId)}>
                        <Cross2Icon />
                      </IconButton>
                    </Flex>
                  </Flex>
                );
              })
            )}

            <Box mt="3" pt="3" style={{ borderTop: '1px solid var(--gray-5)' }}>
              <Flex justify="between" align="center">
                <Text weight="bold" size="4">총 결제금액</Text>
                <Text weight="bold" size="5" color="brown">{totalPrice.toLocaleString()}원</Text>
              </Flex>
            </Box>
          </Box>

          {/* 배송 정보 입력 폼 */}
          <Box mt="2">
            <Text as="div" size="2" mb="1" weight="bold">이메일 (합배송 기준)</Text>
            <TextField.Root placeholder="buyer@example.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Box>
          <Box>
            <Text as="div" size="2" mb="1" weight="bold">배송지 주소</Text>
            <TextField.Root placeholder="서울시 강남구 테헤란로..." value={address} onChange={(e) => setAddress(e.target.value)} />
          </Box>
          <Box>
            <Text as="div" size="2" mb="1" weight="bold">연락처</Text>
            <TextField.Root placeholder="010-0000-0000" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </Box>
        </Flex>

        <Flex gap="3" mt="6" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray" style={{ cursor: 'pointer' }}>
              취소
            </Button>
          </Dialog.Close>
          <Button variant="solid" color="brown" style={{ cursor: 'pointer' }} onClick={handleCheckout} disabled={loading || items.length === 0}>
            {loading ? <Spinner /> : '주문하기'}
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
