package com.ywork.api.service.Impl;

import com.ywork.api.dto.out.WorkStatisticOut;
import com.ywork.api.responsitory.StatisticRepository;
import com.ywork.api.service.StatisticService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@AllArgsConstructor
public class StatisticImpl implements StatisticService {
    private final StatisticRepository statisticRepository;
    @Override
    public List<WorkStatisticOut> statisticJob(String companyId) {
        return statisticRepository.statisticWork(companyId);
    }
}
