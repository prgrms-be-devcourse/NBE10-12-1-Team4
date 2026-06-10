package com.backend.domain.order.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class OrderResponse {

    private Long orderNumber;
    private String email;
    private String address;
    private String zipcode;
    private String phone;
    private LocalDate deliveryDate;
    private Integer totalAmount;
    private String status;
    private LocalDateTime createdAt;
    private List<OrderItemResponse> items;
}