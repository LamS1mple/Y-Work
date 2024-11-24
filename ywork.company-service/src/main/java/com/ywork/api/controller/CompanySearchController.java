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


}
