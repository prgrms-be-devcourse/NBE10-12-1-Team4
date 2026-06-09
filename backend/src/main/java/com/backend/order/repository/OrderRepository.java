package com.backend.order.repository;

import com.gridscircles.cafe.order.entity.Order;
import com.backend.statistics.dto.DailyStatisticsResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, String> {

    @Query("SELECT new com.backend.statistics.dto.DailyStatisticsResponse(FUNCTION('DATE', o.createdAt), SUM(o.totalAmount)) " +
           "FROM Order o " +
           "WHERE o.createdAt >= :startDate " +
           "GROUP BY FUNCTION('DATE', o.createdAt) " +
           "ORDER BY FUNCTION('DATE', o.createdAt) ASC")
    List<DailyStatisticsResponse> getDailySales(@Param("startDate") LocalDateTime startDate);

    @Query("SELECT new com.backend.statistics.dto.DailyStatisticsResponse(FUNCTION('DATE', o.createdAt), SUM(o.totalAmount)) " +
           "FROM Order o " +
           "WHERE o.createdAt >= :startDate AND o.createdAt <= :endDate " +
           "GROUP BY FUNCTION('DATE', o.createdAt) " +
           "ORDER BY FUNCTION('DATE', o.createdAt) ASC")
    List<DailyStatisticsResponse> getDailySalesBetween(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);
}
