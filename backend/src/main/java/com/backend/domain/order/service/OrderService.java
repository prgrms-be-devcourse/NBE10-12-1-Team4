package com.backend.domain.order.service;

import com.backend.domain.order.dto.OrderItemResponse;
import com.backend.domain.order.dto.OrderResponse;
import com.backend.domain.order.entity.Order;
import com.backend.domain.order.entity.OrderItem;
import com.backend.domain.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OrderService {

    private final OrderRepository orderRepository;

    // 이메일 기준 주문 조회
    public List<OrderResponse> getOrdersByEmail(String email) {

        List<Order> orders = orderRepository.findByEmailWithItems(email);

        // 주문 없을 경우 (선택)
        if (orders.isEmpty()) {
            return List.of(); // 또는 예외 처리
        }

        return orders.stream()
                .map(this::toOrderResponse)
                .collect(Collectors.toList());
    }

    // Order → OrderResponse 변환
    private OrderResponse toOrderResponse(Order order) {

        List<OrderItemResponse> items = order.getOrderItems().stream()
                .map(this::toOrderItemResponse)
                .collect(Collectors.toList());

        return OrderResponse.builder()
                .orderNumber(order.getOrderNumber()) // Long 타입 맞춰야 함
                .email(order.getEmail())
                .totalAmount(order.getTotalAmount())
                .status(order.getStatus().name()) // Enum → String
                .items(items)
                .build();
    }

    // OrderItem → OrderItemResponse 변환
    private OrderItemResponse toOrderItemResponse(OrderItem item) {

        return OrderItemResponse.builder()
                .menuName(item.getMenu().getName()) // Menu 엔티티 참조
                .price(item.getPrice())
                .quantity(item.getQuantity())
                .build();
    }
}