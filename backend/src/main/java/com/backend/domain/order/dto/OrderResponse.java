package com.backend.domain.order.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class OrderResponse {

    private Long orderNumber;
    private String email;
    private Integer totalAmount;
    private String status;
    private List<OrderItemResponse> items;
}