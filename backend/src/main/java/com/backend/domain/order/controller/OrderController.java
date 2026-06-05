package com.backend.domain.order.controller;

import com.backend.domain.order.dto.OrderResponse;
import com.backend.domain.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    // 이메일 기준 주문 조회
    // GET /api/orders?email=test@test.com
    @GetMapping
    public List<OrderResponse> getOrdersByEmail(@RequestParam String email) {
        return orderService.getOrdersByEmail(email);
    }
}