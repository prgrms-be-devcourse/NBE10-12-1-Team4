package com.backend.domain.order.dto;

import lombok.Getter;

@Getter
public class OrderItemRequest {
    private String menuId;
    private Integer quantity;
}