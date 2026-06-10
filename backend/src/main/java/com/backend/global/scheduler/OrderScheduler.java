package com.backend.global.scheduler;

import com.backend.domain.order.entity.Order;
import com.backend.domain.order.entity.OrderStatus;
import com.backend.domain.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class OrderScheduler {

    private final OrderRepository orderRepository;

    /**
     * 매일 오후 2시에 실행
     * batchDeadline이 지난 PENDING 주문을 READY_FOR_DELIVERY로 일괄 변경
     */
    @Scheduled(cron = "0 0 14 * * *")
    @Transactional
    public void closePendingOrders() {
        log.info("[스케줄러] 오후 2시 주문 마감 실행");

        // batchDeadline이 현재 시각 이하인 PENDING 주문 조회
        List<Order> orders = orderRepository.findByStatusAndBatchDeadlineLessThanEqual(
                OrderStatus.PENDING,
                LocalDateTime.now()
        );

        // 조회된 주문 상태를 READY_FOR_DELIVERY로 변경
        orders.forEach(order -> order.changeStatus(OrderStatus.READY_FOR_DELIVERY));

        log.info("[스케줄러] 마감 완료 - 처리된 주문 수: {}", orders.size());
    }
}
