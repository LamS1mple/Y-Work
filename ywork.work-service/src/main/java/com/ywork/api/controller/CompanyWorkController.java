package com.ywork.api.controller;

import com.ywork.api.dto.ApiResult;
import com.ywork.api.service.CompanyWorkService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/company")
@Slf4j
@AllArgsConstructor
public class CompanyWorkController {
    private final CompanyWorkService companyWorkService;
    @GetMapping("/job-company")
    public ResponseEntity<ApiResult> jobCompany(@RequestParam("companyId")String companyId) {
        log.info("/company-search/job-company");
        ApiResult apiResult = new ApiResult();
        var result = companyWorkService.getListJobCompany(companyId);
        apiResult.setObject(result);
        log.info("success");
        return ResponseEntity.ok(apiResult);
    }
}
