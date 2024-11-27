package com.ywork.api.controller;

import com.ywork.api.dto.ApiResult;
import com.ywork.api.dto.in.WorkCreateIn;
import com.ywork.api.service.CompanyWorkService;
import com.ywork.api.service.WorkService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Date;

@RestController
@RequestMapping("/company")
@Slf4j
@AllArgsConstructor
public class CompanyWorkController {
    private final CompanyWorkService companyWorkService;
    private final WorkService workService;

    @GetMapping("/job-company")
    public ResponseEntity<ApiResult> jobCompany(@RequestParam("companyId")String companyId) {
        log.info("/company-search/job-company");
        ApiResult apiResult = new ApiResult();
        var result = companyWorkService.getListJobCompany(companyId);
        apiResult.setObject(result);
        log.info("success");
        return ResponseEntity.ok(apiResult);
    }

    @PostMapping("/job/create")
    public ResponseEntity<ApiResult> createJob(@RequestBody WorkCreateIn workCreateIn){
        log.info("/company-search/job/create");
        ApiResult apiResult = new ApiResult();
        workService.createWork(workCreateIn);
        apiResult.setObject(Collections.emptyMap());
        log.info("success");
        return ResponseEntity.ok(apiResult);
    }
}
