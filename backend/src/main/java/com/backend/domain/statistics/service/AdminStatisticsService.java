package com.backend.domain.statistics.service;

import com.backend.domain.order.repository.OrderItemRepository;
import com.backend.domain.order.repository.OrderRepository;
import com.backend.domain.statistics.dto.BeanStatisticsResponse;
import com.backend.domain.statistics.dto.DailyStatisticsResponse;
import com.backend.domain.statistics.dto.RangeStatisticsResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdminStatisticsService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;

    public List<DailyStatisticsResponse> getDailySales(int days) {
        LocalDateTime startDate = LocalDateTime.now().minusDays(days).withHour(0).withMinute(0).withSecond(0);
        return orderRepository.getDailySales(startDate);
    }

    public BeanStatisticsResponse getProductSales() {
        List<BeanStatisticsResponse.BeanStatistic> beans = orderItemRepository.getProductSales();
        return new BeanStatisticsResponse(beans);
    }

    public RangeStatisticsResponse getPeriodSales(LocalDate startDate, LocalDate endDate) {
        LocalDateTime start = startDate.atStartOfDay();
        LocalDateTime end = endDate.atTime(23, 59, 59);

        List<DailyStatisticsResponse> dailyList = orderRepository.getDailySalesBetween(start, end);
        
        Long totalSales = dailyList.stream()
                .mapToLong(DailyStatisticsResponse::getTotalAmount)
                .sum();
                
        return new RangeStatisticsResponse(totalSales, dailyList);
    }
}
