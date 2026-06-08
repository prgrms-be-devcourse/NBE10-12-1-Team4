package com.backend.order.service;

import com.backend.order.dto.*;
import com.backend.order.entity.*;
import com.backend.order.repository.OrderRepository;
import com.backend.menu.entity.Menu;
import com.backend.menu.repository.MenuRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final MenuRepository menuRepository;

    // 이메일 기준 주문 조회
    @Transactional(readOnly = true)
    public List<OrderResponse> getOrdersByEmail(String email) {

        List<Order> orders = orderRepository.findByEmailWithItems(email);

        return orders.stream()
                .map(this::toResponse)
                .toList();
    }

    // 단일 주문 조회
    @Transactional(readOnly = true)
    public OrderResponse getOrder(Long orderId) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        return toResponse(order);
    }

    // 주문 생성 + 이메일 기준 합치기
    @Transactional
    public void createOrder(OrderRequest request) {

        // batchDeadline 계산 (김민준님 코드)
        LocalDateTime batchDeadline = calcBatchDeadline();

        // 기존 주문 조회
        Optional<Order> existingOrder =
                orderRepository.findByEmailAndBatchDeadline(
                        request.getEmail(),
                        batchDeadline
                );

        Order order = existingOrder.orElseGet(() ->
                Order.builder()
                        .email(request.getEmail())
                        .batchDeadline(batchDeadline)
                        .status(OrderStatus.CREATED)
                        .build()
        );

        // 주문 아이템 추가
        for (OrderItemRequest itemRequest : request.getItems()) {

            Menu menu = menuRepository.findById(itemRequest.getMenuId())
                    .orElseThrow(() -> new RuntimeException("Menu not found"));

            OrderItem orderItem = OrderItem.builder()
                    .order(order)
                    .menu(menu)
                    .quantity(itemRequest.getQuantity())
                    .price(menu.getPrice())
                    .build();

            order.addOrderItem(orderItem);
        }

        // 총 금액 계산
        order.calculateTotalAmount();

        orderRepository.save(order);
    }

    // batchDeadline 계산 (김민준님 코드 유지)
    public LocalDateTime calcBatchDeadline() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime todayCutoff = LocalDate.now().atTime(14, 0);

        if (now.isBefore(todayCutoff)) {
            return todayCutoff;
        } else {
            return todayCutoff.plusDays(1);
        }
    }

    // Entity → DTO 변환 (김민준님 방식 유지 + 구조 통일)
    private OrderResponse toResponse(Order order) {

        List<OrderItemResponse> items = order.getOrderItems().stream()
                .map(item -> OrderItemResponse.builder()
                        .menuName(item.getMenu().getName())   // snapshot 아니면 이걸로
                        .price(item.getPrice())
                        .quantity(item.getQuantity())
                        .build())
                .toList();

        return OrderResponse.builder()
                .orderNumber(order.getId()) // orderNumber 필드 맞춰서 수정 가능
                .email(order.getEmail())
                .totalAmount(order.getTotalAmount())
                .status(order.getStatus().name())
                .items(items)
                .build();
    }
}