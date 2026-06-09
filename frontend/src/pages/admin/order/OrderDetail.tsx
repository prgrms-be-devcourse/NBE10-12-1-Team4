import { useEffect, useState } from "react";
import {
  Dialog,
  Button,
  Flex,
  Text,
  Box,
} from "@radix-ui/themes";
import type { OrderDetail, OrderDetailProps } from "../../../type/admin";
import { ORDERS } from "../dumpData";
import { orderAPI } from "../../../services/admin/api";

const OrderDetail = ({ isOpen, id, onClose }: OrderDetailProps) => {
  const [order, setOrder] = useState<OrderDetail | null>(null);

  const getInit = () => {
    orderAPI.getOrderDetail(id).then((res) => {
      setOrder(res?.data)
    })
  }

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (id) getInit()
  }, [id]);

  if (!isOpen) return null;
  return (
    <Dialog.Content maxWidth="500px">
      <Dialog.Title>{order?.orderNumber} 확인</Dialog.Title>
      <Flex direction="column" gap="4">
        <Box
          p="3"
          style={{
            backgroundColor: "var(--gray-2)",
            borderRadius: "var(--radius-3)",
          }}
        >
          {order?.items?.map((item, index) => {
            return (
              <Flex
                justify="between"
                align="center"
                mb="3"
                key={index}
              >
                <Box>
                  <Text weight="bold" size="3" as="div">
                    {item?.menuName}
                  </Text>
                  <Text color="gray" size="2">
                    {item?.price.toLocaleString()}원
                  </Text>
                </Box>
                <Flex align="center" gap="3">
                    <Text>{item?.quantity.toLocaleString()}</Text>
                </Flex>
              </Flex>
            );
          })}
          <Box mt="3" pt="3" style={{ borderTop: '1px solid var(--gray-5)' }}>
              <Flex justify="between" align="center">
                <Text weight="bold" size="4">총 결제금액</Text>
                <Text weight="bold" size="5" color="brown">{order?.totalAmount.toLocaleString()}원</Text>
              </Flex>
            </Box>
        </Box>
        <Box mt="2">
          <Text as="div" size="2" mb="1" weight="bold">
            이메일
          </Text>
          <Text as="div" size="2" mb="1">
            {order?.email}
          </Text>
        </Box>
        <Box>
          <Text as="div" size="2" mb="1" weight="bold">
            배송지 주소
          </Text>
          <Text as="div" size="2" mb="1">
            {order?.address} / {order?.zipcode}
          </Text>
        </Box>
        <Box>
          <Text as="div" size="2" mb="1" weight="bold">
            연락처
          </Text>
          <Text as="div" size="2" mb="1">
            {order?.phone}
          </Text>
        </Box>
      </Flex>
      <Flex mt="2" justify="end">
        <Dialog.Close>
          <Button variant="soft" color="gray" style={{ cursor: "pointer" }}>
            닫기
          </Button>
        </Dialog.Close>
      </Flex>
    </Dialog.Content>
  );
};
export default OrderDetail;
