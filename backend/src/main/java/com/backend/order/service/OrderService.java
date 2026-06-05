package com.backend.order.service;

import com.backend.order.dto.OrderItemResponse;
import com.backend.order.dto.OrderResponse;
import com.backend.order.entity.Order;
import com.backend.order.entity.OrderItem;
import com.backend.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;

    // 이메일 기준 주문 조회
    public List<OrderResponse> getOrdersByEmail(String email) {

        List<Order> orders = orderRepository.findByEmail(email);

        return orders.stream()
                .map(this::toResponse)
                .toList();
    }

    // 단일 주문 조회
    public OrderResponse getOrder(Long orderId) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        return toResponse(order);
    }

    // Entity → DTO 변환
    private OrderResponse toResponse(Order order) {

        List<OrderItemResponse> items = order.getOrderItems().stream()
                .map(item -> OrderItemResponse.builder()
                        .menuName(item.getMenuNameSnapshot())
                        .price(item.getUnitPriceSnapshot())
                        .quantity(item.getQuantity())
                        .build())
                .toList();

        return OrderResponse.builder()
                .orderNumber(order.getOrderNumber())
                .email(order.getEmail())
                .totalAmount(order.getTotalAmount())
                .status(order.getStatus().name())
                .items(items)
                .build();
    }
}