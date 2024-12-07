package com.ywork.api.controller;

import com.ywork.api.dto.ApiResult;
import com.ywork.api.dto.in.CandidateIn;
import com.ywork.api.service.CandidateService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@Slf4j
@AllArgsConstructor
@RequestMapping("/candidate")
public class CandidateController {
    private final CandidateService candidateService;
    @PostMapping("/list")
    public ResponseEntity<ApiResult> getCandidates(@RequestBody CandidateIn candidateIn) {
        log.info("/candidate/list");
        ApiResult apiResult = new ApiResult();
        apiResult.setObject(candidateService.getCandidates(candidateIn));
        log.info("Success");
        return  ResponseEntity.ok(apiResult);
    }

    @PostMapping("/status")
    public ResponseEntity<?> changeStatus(@RequestBody CandidateIn candidateIn){
        log.info("/candidate/status");
        candidateService.changeStatus(candidateIn);
        log.info("Success");
        return ResponseEntity.ok(Collections.emptyMap());
    }

    @GetMapping("/list/apply-company")
    public ResponseEntity<ApiResult> getListApplyCompany(String companyId) {
        log.info("/candidate/list/apply-company");
        ApiResult apiResult = new ApiResult();
        apiResult.setObject(candidateService.getListApplyCompany(companyId));
        log.info("Success");
        return  ResponseEntity.ok(apiResult);
    }

    @PostMapping("/apply-company/status")
    @PreAuthorize("hasAuthority('ROLE_admin-company') or hasAuthority('admin-company')")
    public ResponseEntity<?> changeStatusApplyCompany(@RequestBody CandidateIn candidateIn){
        log.info("/candidate/apply-company/status");
        candidateService.changeStatusApplyCompany(candidateIn);
        log.info("Success");
        return ResponseEntity.ok(Collections.emptyMap());
    }
}
