package com.gridscircles.cafe.order.entity;

import com.gridscircles.cafe.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(name = "orders", indexes = {
                @Index(name = "idx_order_email", columnList = "email"),
                @Index(name = "idx_order_status", columnList = "status"),
                @Index(name = "idx_order_delivery_date", columnList = "deliveryDate")
})
public class Order extends BaseEntity {

        @Id
        @GeneratedValue(strategy = GenerationType.UUID)
        private String id;

        @Column(nullable = false, unique = true)
        private Long orderNumber;

        @Column(nullable = false)
        private String email;

        @Column(nullable = false)
        private String address;

        @Column(nullable = false)
        private String zipcode;

        @Column(nullable = false)
        private String phone;

        @Column(nullable = false)
        private LocalDate deliveryDate;

        @Column(nullable = false)
        private Integer totalAmount;

        @Column(name = "batch_deadline")
        private LocalDateTime batchDeadline;

        @Enumerated(EnumType.STRING)
        @Column(nullable = false)
        private OrderStatus status;

        @Builder.Default
        @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
        private List<OrderItem> orderItems = new ArrayList<>();
}