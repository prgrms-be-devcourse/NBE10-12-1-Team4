package com.backend.domain.order.repository;

import com.backend.domain.order.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    // 이메일 기준 주문 조회
    List<Order> findByEmail(String email);

}