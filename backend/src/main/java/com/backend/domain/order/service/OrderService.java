package com.backend.domain.order.service;

import com.backend.domain.order.dto.*;
import com.backend.domain.order.entity.*;
import com.backend.domain.order.repository.OrderRepository;
import com.backend.domain.menu.entity.Menu;
import com.backend.domain.menu.repository.MenuRepository;

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

    // 주문 다건 조회(email 별로 묶지 않음)
    @Transactional(readOnly = true)
    public List<OrderResponse> getAll() {

        List<Order> orders = orderRepository.findAll();

        return orders.stream()
                .map(this::toResponse)
                .toList();
    }

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
    public OrderResponse getOrder(String orderId) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        return toResponse(order);
    }

    @Transactional(readOnly = true)
    public OrderResponse getOrderToOrderNumber(Long orderNumber) {
        Order order = orderRepository.findByOrderNumber(orderNumber)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        return toResponse(order);
    }

    @Transactional
    public void editOrderStatus(Long orderNumber, OrderStatusRequest request) {
        Order order = orderRepository.findByOrderNumber(orderNumber)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.changeStatus(request.getStatus());
    }

    // 주문 생성 + 이메일 기준 합치기
    @Transactional
    public void createOrder(OrderRequest request) {

        // batchDeadline 계산
        LocalDateTime batchDeadline = calcBatchDeadline();

        // 기존 주문 조회
        Optional<Order> existingOrder =
                orderRepository.findByEmailAndBatchDeadline(
                        request.getEmail(),
                        batchDeadline
                );

        Order order = existingOrder.orElseGet(() ->
                Order.builder()
                        .orderNumber(orderRepository.getNextOrderNumber())
                        .email(request.getEmail())
                        .address(request.getAddress())
                        .zipcode(request.getZipcode())
                        .phone(request.getPhone())
                        .batchDeadline(batchDeadline)
                        .deliveryDate(batchDeadline.toLocalDate().plusDays(1))
                        .status(OrderStatus.PENDING)
                        .build()
        );

        // 주문 아이템 추가
        for (OrderItemRequest itemRequest : request.getItems()) {

            Menu menu = menuRepository.findById(itemRequest.getMenuId())
                    .orElseThrow(() -> new RuntimeException("Menu not found"));

            OrderItem orderItem = OrderItem.builder()
                    .order(order)
                    .menu(menu)
                    .menuNameSnapshot(menu.getName())
                    .unitPriceSnapshot(menu.getPrice())
                    .quantity(itemRequest.getQuantity())
                    .build();

            order.addOrderItem(orderItem);
        }

        // 총 금액 계산
        order.calculateTotalAmount();

        orderRepository.save(order);
    }

    // batchDeadline 계산
    public LocalDateTime calcBatchDeadline() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime todayCutoff = LocalDate.now().atTime(14, 0);

        if (now.isBefore(todayCutoff)) {
            return todayCutoff;
        } else {
            return todayCutoff.plusDays(1);
        }
    }

    // Entity → DTO 변환
    private OrderResponse toResponse(Order order) {

        List<OrderItemResponse> items = order.getOrderItems().stream()
                .map(item -> OrderItemResponse.builder()
                        .menuName(item.getMenu().getName())   // snapshot 아니면 이걸로
                        .price(item.getPrice())
                        .quantity(item.getQuantity())
                        .build())
                .toList();

        return OrderResponse.builder()
                .orderNumber(order.getOrderNumber())
                .email(order.getEmail())
                .address(order.getAddress())
                .zipcode(order.getZipcode())
                .phone(order.getPhone())
                .deliveryDate(order.getDeliveryDate())
                .totalAmount(order.getTotalAmount())
                .status(order.getStatus().name())
                .createdAt(order.getCreatedAt())
                .items(items)
                .build();
    }
}