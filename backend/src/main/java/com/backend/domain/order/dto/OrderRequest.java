package com.backend.domain.order.dto;

import lombok.Getter;
import java.util.List;

@Getter
public class OrderRequest {
    private String email;
    private List<OrderItemRequest> items;
}