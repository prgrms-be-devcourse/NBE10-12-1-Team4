package com.gridscircles.cafe.order.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class OrderItemResponse {

    private String menuName;
    private Integer price;
    private Integer quantity;
}