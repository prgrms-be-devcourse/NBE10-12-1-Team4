package com.backend.domain.order.repository;

import com.backend.domain.order.entity.Order;
import com.backend.domain.order.entity.OrderStatus;
import com.backend.domain.statistics.dto.DailyStatisticsResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, String> {

    @Query(value = "SELECT CAST(created_at AS date) as date, SUM(total_amount) as totalAmount " +
            "FROM orders " +
            "WHERE created_at >= :startDate " +
            "GROUP BY CAST(created_at AS date) " +
            "ORDER BY CAST(created_at AS date) ASC", nativeQuery = true)
    List<DailyStatisticsResponse> getDailySales(@Param("startDate") LocalDateTime startDate);

    @Query(value = "SELECT CAST(created_at AS date) as date, SUM(total_amount) as totalAmount " +
            "FROM orders " +
            "WHERE created_at >= :startDate AND created_at <= :endDate " +
            "GROUP BY CAST(created_at AS date) " +
            "ORDER BY CAST(created_at AS date) ASC", nativeQuery = true)
    List<DailyStatisticsResponse> getDailySalesBetween(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);

    // 이메일 기준 주문 조회 (기본)
    List<Order> findByEmail(String email);

    Optional<Order> findByOrderNumber(Long orderNumber);

    // 이메일 기준 주문 조회 (OrderItem + Menu까지 한 번에 조회)
    @Query("SELECT o FROM Order o " +
            "JOIN FETCH o.orderItems oi " +
            "JOIN FETCH oi.menu " +
            "WHERE o.email = :email " +
            "ORDER BY o.createdAt DESC")
    List<Order> findByEmailWithItems(@Param("email") String email);

    Optional<Order> findByEmailAndBatchDeadline(String email, LocalDateTime batchDeadline);

    // 상태 + 배치 시간 기준 조회
    List<Order> findByStatusAndBatchDeadlineLessThanEqual(
            OrderStatus status,
            LocalDateTime batchDeadline
    );

    // 이메일 기준 최신순 조회
    List<Order> findByEmailOrderByCreatedAtDesc(String email);

    // 특정 기간 주문 조회 (매출 통계용)
    List<Order> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);

    @Query("SELECT COALESCE(MAX(o.orderNumber), 0) + 1 FROM Order o")
    Long getNextOrderNumber();

    @Modifying
    @Query(value = "UPDATE orders SET created_at = :createdAt WHERE id = :id", nativeQuery = true)
    void updateCreatedAt(@Param("id") String id, @Param("createdAt") LocalDateTime createdAt);
}