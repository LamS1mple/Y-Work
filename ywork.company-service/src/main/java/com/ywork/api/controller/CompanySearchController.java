package com.ywork.api.controller;

import com.ywork.api.dto.ApiResult;
import com.ywork.api.dto.in.CompanyGetIn;
import com.ywork.api.service.CompanySearchService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@AllArgsConstructor
@RequestMapping("/company-search")
public class CompanySearchController {
    private final CompanySearchService companySearchService;
    @PostMapping("/get-company")
    public ResponseEntity<ApiResult> companySearch(@RequestBody CompanyGetIn companyGetIn) {
        log.info("/company-search/get-company");
            ApiResult apiResult = new ApiResult();
            var result = companySearchService.getListCompany(companyGetIn.getStatus());
            apiResult.setObject(result);
            log.info("success");
            return ResponseEntity.ok(apiResult);
    }

    @PostMapping("/company/apply")
    public ResponseEntity<ApiResult> companyApply(@RequestBody CompanyGetIn companyGetIn) {
        log.info("/company-search/company/apply");
        ApiResult apiResult = new ApiResult();
        companySearchService.companyApply(companyGetIn);
        apiResult.setObject(null);
        log.info("success");
        return ResponseEntity.ok(apiResult);
    }

    @PostMapping("/company/change-status/apply")
    public ResponseEntity<ApiResult> companyApplyChangeStatus(@RequestBody CompanyGetIn companyGetIn) {
        log.info("/company/change-status/apply");
        ApiResult apiResult = new ApiResult();
        companySearchService.companyApplyChangeStatus(companyGetIn);
        apiResult.setObject(null);
        log.info("success");
        return ResponseEntity.ok(apiResult);
    }




}
