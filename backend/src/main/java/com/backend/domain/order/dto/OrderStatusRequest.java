package com.backend.domain.order.dto;

import com.backend.domain.order.entity.OrderStatus;
import lombok.Getter;

@Getter
public class OrderStatusRequest {
	private OrderStatus status;
}
