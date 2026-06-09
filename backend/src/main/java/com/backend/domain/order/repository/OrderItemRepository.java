package com.backend.domain.order.repository;

import com.backend.domain.order.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, String> {

    List<OrderItem> findByOrder_Id(String orderId);

    List<OrderItem> findByMenu_Id(String menuId);
}