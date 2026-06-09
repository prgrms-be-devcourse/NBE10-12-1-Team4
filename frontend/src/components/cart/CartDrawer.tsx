import { Dialog, Button, Flex, Text, TextField, Box, IconButton, Spinner } from '@radix-ui/themes';
import { MinusIcon, PlusIcon, Cross2Icon } from '@radix-ui/react-icons';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../store/CartContext';
import { productAPI, orderAPI } from '../../services/api';

export default function CartDrawer() {
  const { items, updateQuantity, removeItem, clear, totalCount } = useCart();
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // 주문 폼 상태
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [zipcode, setZipcode] = useState('');
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
    if (!email || !address || !zipcode || !phone) {
      alert('이메일, 배송지 주소, 우편번호, 연락처를 모두 입력해주세요.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('올바른 이메일 형식을 입력해주세요.');
      return;
    }

    const zipcodeRegex = /^\d{5}$/;
    if (!zipcodeRegex.test(zipcode)) {
      alert('우편번호는 5자리의 숫자로 입력해주세요.');
      return;
    }

    const phoneRegex = /^\d{2,3}-?\d{3,4}-?\d{4}$/;
    if (!phoneRegex.test(phone)) {
      alert('올바른 연락처 형식을 입력해주세요. 띄어쓰기 및 하이픈 제외 (예: 01012345678)');
      return;
    }

    setLoading(true);
    try {
      await orderAPI.create({ email, address, zipcode, phone, items });

      clear(); // 결제 성공 시 장바구니 비우기

      const enrichedItems = items.map(item => {
        const detail = getProductDetail(item.productId);
        return {
          ...item,
          name: detail.name,
          price: detail.price
        };
      });

      setOpen(false); // 모달 닫기
      navigate('/order-complete', {
        state: {
          orderDetails: {
            email,
            address,
            zipcode,
            phone,
            items: enrichedItems,
            totalPrice,
            merged: false,
            message: '주문이 성공적으로 접수되었습니다!'
          }
        }
      });


    } catch (error) {
      alert('주문 처리 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button size="3" variant="solid" color="brown" style={{ cursor: 'pointer' }}>
          장바구니 및 결제 {totalCount > 0 && `(${totalCount})`}
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
            <Text as="div" size="2" mb="1" weight="bold">우편번호</Text>
            <TextField.Root placeholder="12345" value={zipcode} onChange={(e) => setZipcode(e.target.value)} maxLength={5} />
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
