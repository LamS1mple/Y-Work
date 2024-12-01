package com.ywork.api.controller;

import com.ywork.api.dto.ApiResult;
import com.ywork.api.dto.in.CandidateIn;
import com.ywork.api.service.CandidateService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;

@RestController
@Slf4j
@AllArgsConstructor
@RequestMapping("/candidate")
public class CandidateController {
    private final CandidateService candidateService;
    @PostMapping("/list")
    public ResponseEntity<ApiResult> getCandidates(@RequestBody CandidateIn candidateIn) {
        log.info("/company/list");
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
}
