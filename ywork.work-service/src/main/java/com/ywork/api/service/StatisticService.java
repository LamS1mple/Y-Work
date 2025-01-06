package com.ywork.api.service;

import com.ywork.api.dto.out.WorkStatisticOut;

import java.util.List;

public interface StatisticService {

    List<WorkStatisticOut> statisticJob(String companyId);
}
