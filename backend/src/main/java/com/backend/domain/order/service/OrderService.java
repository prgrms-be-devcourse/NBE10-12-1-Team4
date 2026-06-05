package com.backend.domain.order.service;

import com.backend.domain.order.dto.OrderItemResponse;
import com.backend.domain.order.dto.OrderResponse;
import com.backend.domain.order.entity.Order;
import com.backend.domain.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
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

    // 주문 생성 시 batchDeadline 계산
    public LocalDateTime calcBatchDeadline() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime todayCutoff = LocalDate.now().atTime(14, 0); // 오늘 14:00

        if (now.isBefore(todayCutoff)) {
            return todayCutoff;          // 14:00 이전이면 오늘 14:00
        } else {
            return todayCutoff.plusDays(1); // 14:00 이후면 내일 14:00
        }
    }
}