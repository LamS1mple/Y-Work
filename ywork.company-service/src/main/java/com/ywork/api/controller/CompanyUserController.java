package com.ywork.api.controller;

import com.ywork.api.dto.ApiResult;
import com.ywork.api.service.CompanyService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@Slf4j
@RequestMapping("/public/company-user")
public class CompanyUserController {
    private CompanyService companyService;
    @GetMapping("/detail")
    public ResponseEntity<ApiResult> detailCompany(@RequestParam String companyId){
        log.info("/company-user/detail");
        ApiResult apiResult = new ApiResult();
        apiResult.setObject(companyService.detailCompany(companyId));
        log.info("Success");
        return  ResponseEntity.ok(apiResult);
    }
    @GetMapping("/list/company")
    public ResponseEntity<ApiResult> listCompany(){
        log.info("/public/company-user/list/company");
        ApiResult apiResult = new ApiResult();
        apiResult.setObject(companyService.getAllCompaniesPublic());
        log.info("Success");
        return  ResponseEntity.ok(apiResult);
    }
}
