package com.backend.domain.statistics.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class StatisticsResponse {

    private LocalDate date;
    private Integer totalSales;
}
