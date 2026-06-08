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
        // 전날 날짜 기준으로 시작,종료 시각 설정
        LocalDate yesterday = LocalDate.now().minusDays(1);
        LocalDateTime start = yesterday.atStartOfDay();     // 전날 00:00:00
        LocalDateTime end = yesterday.plusDays(1).atStartOfDay();       // 오늘 00:00:00

        // 전날 생성된 주문 목록 조회
        List<Order> orders = orderRepository.findByCreatedAtBetween(start, end);

        // 주문 목록에서 총 매출 합산
        int totalSales = orders.stream()
                .mapToInt(Order::getTotalAmount)
                .sum();

        return StatisticsResponse.builder()
                .date(yesterday)
                .totalSales(totalSales)
                .build();
    }
}
