package com.backend.domain.order.repository;

import com.backend.domain.order.entity.OrderItem;
import com.backend.domain.statistics.dto.BeanStatisticsResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, String> {

    @Query("SELECT new com.backend.domain.statistics.dto.BeanStatisticsResponse$BeanStatistic(m.name, SUM(CAST(oi.quantity AS long) * CAST(oi.unitPriceSnapshot AS long)), SUM(CAST(oi.quantity AS long))) " +
           "FROM OrderItem oi " +
           "JOIN oi.menu m " +
           "JOIN oi.order o " +
           "GROUP BY m.id, m.name " +
           "ORDER BY SUM(CAST(oi.quantity AS long) * CAST(oi.unitPriceSnapshot AS long)) DESC")
    List<BeanStatisticsResponse.BeanStatistic> getProductSales();

    List<OrderItem> findByOrder_Id(String orderId);

    List<OrderItem> findByMenu_Id(String menuId);
}