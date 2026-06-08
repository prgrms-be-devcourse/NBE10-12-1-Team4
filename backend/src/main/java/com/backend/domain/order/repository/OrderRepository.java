package com.backend.domain.order.repository;

import com.backend.domain.order.entity.Order;
import com.backend.domain.order.entity.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {

    // 이메일 기준 주문 조회 (기본)
    List<Order> findByEmail(String email);

    // 이메일 기준 주문 조회 (OrderItem + Menu까지 한 번에 조회)
    @Query("SELECT o FROM Order o " +
            "JOIN FETCH o.orderItems oi " +
            "JOIN FETCH oi.menu " +
            "WHERE o.email = :email")
    List<Order> findByEmailWithItems(@Param("email") String email);

    Optional<Order> findByEmailAndBatchDeadline(String email, LocalDateTime batchDeadline);

    // 상태 + 배치 시간 기준 조회
    List<Order> findByStatusAndBatchDeadlineLessThanEqual(
            OrderStatus status,
            LocalDateTime batchDeadline
    );

    // 이메일 기준 최신순 조회
    List<Order> findByEmailOrderByCreatedAtDesc(String email);
}