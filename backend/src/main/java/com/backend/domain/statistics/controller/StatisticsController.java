package com.backend.domain.statistics.controller;

import com.backend.domain.statistics.dto.StatisticsResponse;
import com.backend.domain.statistics.service.StatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/statistics")
public class StatisticsController {

    private final StatisticsService statisticsService;

    @GetMapping("/day")
    public StatisticsResponse getDailyStatistics() {
        return statisticsService.getDailyStatistics();
    }
}
