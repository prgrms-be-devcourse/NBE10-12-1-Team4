package com.backend.domain.order.dto;

import lombok.Getter;
import java.util.List;

@Getter
public class OrderRequest {
    private String email;
    private String address;
    private String zipcode;
    private String phone;
    private List<OrderItemRequest> items;
}