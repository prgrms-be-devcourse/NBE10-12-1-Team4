package com.backend.domain.order.controller;

import com.backend.domain.order.dto.OrderItemResponse;
import com.backend.domain.order.dto.OrderResponse;
import com.backend.domain.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    // 주문 생성 (이메일 기준 주문 합치기 포함)
    @PostMapping
    public void createOrder(@RequestBody OrderRequest request) {
        orderService.createOrder(request);
    }

    // 주문 조회 (이메일 기준)
    @GetMapping
    public List<OrderResponse> getOrders(@RequestParam String email) {
        return orderService.getOrdersByEmail(email);
    }
}