package com.backend.domain.order.entity;

import com.backend.global.base.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(
        name = "email_logs",
        indexes = {
                @Index(name = "idx_email_log_email", columnList = "email")
        }
)
public class EmailLog extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String subject;

    private LocalDateTime sentAt;
}
