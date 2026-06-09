package com.backend.order.repository;

import com.gridscircles.cafe.order.entity.OrderItem;
import com.backend.statistics.dto.BeanStatisticsResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, String> {

    @Query("SELECT new com.backend.statistics.dto.BeanStatisticsResponse$BeanStatistic(m.name, SUM(CAST(oi.quantity AS long) * CAST(oi.unitPriceSnapshot AS long)), SUM(CAST(oi.quantity AS long))) " +
           "FROM OrderItem oi " +
           "JOIN oi.menu m " +
           "JOIN oi.order o " +
           "GROUP BY m.id, m.name " +
           "ORDER BY SUM(CAST(oi.quantity AS long) * CAST(oi.unitPriceSnapshot AS long)) DESC")
    List<BeanStatisticsResponse.BeanStatistic> getProductSales();
}
