package com.backend.domain.statistics.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class BeanStatisticsResponse {
    private List<BeanStatistic> beans;

    @Getter
    @Setter
    @AllArgsConstructor
    public static class BeanStatistic {
        private String menuName;
        private Long totalSales;
        private Long orderCount;
    }
}
