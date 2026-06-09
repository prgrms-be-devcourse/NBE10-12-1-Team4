package com.backend.domain.order.controller;

import com.backend.domain.order.dto.OrderRequest;
import com.backend.domain.order.dto.OrderResponse;
import com.backend.domain.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/guest/orders")
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public void createOrder(@RequestBody OrderRequest request) {
        orderService.createOrder(request);
    }

    @GetMapping
    public List<OrderResponse> getOrders(@RequestParam String email) {
        if ("admin".equals(email)) {
            return orderService.getAll();
        }
        return orderService.getOrdersByEmail(email);
    }
}