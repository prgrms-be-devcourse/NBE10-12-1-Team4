package com.backend.domain.statistics.service;

import com.backend.domain.order.entity.Order;
import com.backend.domain.order.repository.OrderRepository;
import com.backend.domain.statistics.dto.StatisticsResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StatisticsService {

    private final OrderRepository orderRepository;

    @Transactional(readOnly = true)
    public StatisticsResponse getDailyStatistics() {
        LocalDate yesterday = LocalDate.now().minusDays(1);
        LocalDateTime start = yesterday.atStartOfDay();
        LocalDateTime end = yesterday.plusDays(1).atStartOfDay();

        List<Order> orders = orderRepository.findByCreatedAtBetween(start, end);

        int totalSales = orders.stream()
                .mapToInt(Order::getTotalAmount)
                .sum();

        return StatisticsResponse.builder()
                .date(yesterday)
                .totalSales(totalSales)
                .build();
    }
}
