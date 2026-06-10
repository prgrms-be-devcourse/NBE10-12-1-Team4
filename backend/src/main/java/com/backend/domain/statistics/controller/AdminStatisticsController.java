package com.backend.domain.statistics.controller;

import com.backend.domain.statistics.dto.BeanStatisticsResponse;
import com.backend.domain.statistics.dto.DailyStatisticsResponse;
import com.backend.domain.statistics.dto.RangeStatisticsResponse;
import com.backend.domain.statistics.service.AdminStatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/admin/statistics")
@RequiredArgsConstructor
public class AdminStatisticsController {

    private final AdminStatisticsService statisticsService;

    @GetMapping("/day")
    public ResponseEntity<List<DailyStatisticsResponse>> getDailySales(
            @RequestParam(defaultValue = "30") int days) {
        return ResponseEntity.ok(statisticsService.getDailySales(days));
    }

    @GetMapping("/bean")
    public ResponseEntity<BeanStatisticsResponse> getProductSales() {
        return ResponseEntity.ok(statisticsService.getProductSales());
    }

    @GetMapping("/range")
    public ResponseEntity<RangeStatisticsResponse> getPeriodSales(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        return ResponseEntity.ok(statisticsService.getPeriodSales(startDate, endDate));
    }
}
