package com.backend.order.dto;

import lombok.Getter;

@Getter
public class OrderItemRequest {
    private Long menuId;
    private Integer quantity;
}