package com.backend.domain.order.controller;

import com.backend.domain.order.dto.OrderResponse;
import com.backend.domain.order.dto.OrderStatusRequest;
import com.backend.domain.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/orders")
public class AdminOrderController {
	private final OrderService orderService;

	@GetMapping("/{orderNumber}")
	public OrderResponse getOrderToOrderNumber(@PathVariable Long orderNumber) {
		return orderService.getOrderToOrderNumber(orderNumber);
	}

	@PatchMapping("/active/{orderNumber}")
	public void editOrderStatus(
			@PathVariable Long orderNumber,
			@RequestBody OrderStatusRequest request
	) {
		orderService.editOrderStatus(orderNumber, request);
	}
}
