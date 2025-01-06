package com.ywork.api.controller;

import com.ywork.api.dto.ApiResult;
import com.ywork.api.dto.in.WorkCreateIn;
import com.ywork.api.service.CompanyWorkService;
import com.ywork.api.service.StatisticService;
import com.ywork.api.service.WorkService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Date;

@RestController
@RequestMapping("/statistic")
@Slf4j
@AllArgsConstructor
public class StatisticController {
    private final CompanyWorkService companyWorkService;
    private final StatisticService statisticService;

    @GetMapping("/job-company")
    public ResponseEntity<ApiResult> jobCompany(@RequestParam("companyId")String companyId) {
        log.info("/statistic/job-company");
        ApiResult apiResult = new ApiResult();
        var result = statisticService.statisticJob(companyId);
        apiResult.setObject(result);
        log.info("success");
        return ResponseEntity.ok(apiResult);
    }
}
