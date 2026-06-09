package com.backend.domain.statistics.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
public class DailyStatisticsResponse {
    private LocalDate date;
    private Long totalAmount;
}
