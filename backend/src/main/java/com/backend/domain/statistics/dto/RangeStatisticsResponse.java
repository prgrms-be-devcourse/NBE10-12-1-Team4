package com.backend.domain.statistics.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class RangeStatisticsResponse {
    private Long totalSales;
    private List<DailyStatisticsResponse> daily;
}
