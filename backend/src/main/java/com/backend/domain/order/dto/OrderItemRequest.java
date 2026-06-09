package com.backend.domain.order.dto;

import lombok.Getter;

@Getter
public class OrderItemRequest {
    private Integer menuId;
    private Integer quantity;
}