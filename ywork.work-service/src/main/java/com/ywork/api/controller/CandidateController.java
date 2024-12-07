package com.ywork.api.controller;

import com.ywork.api.dto.ApiResult;
import com.ywork.api.service.CandidateService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@AllArgsConstructor
@Slf4j
@RequestMapping("/candidate")
public class CandidateController {
    private final CandidateService candidateService;
    @PostMapping("/create")
    public ResponseEntity<ApiResult> createUser(@RequestPart(required = false) MultipartFile file,
                                                @RequestPart String workId,
                                                @RequestPart String optionUpload) {
        log.info("/candidate/create");
        candidateService.applyCandidate(file, workId, optionUpload);
        ApiResult apiResult = new ApiResult();
        apiResult.setObject(null);
        log.info("Success");
        return  ResponseEntity.ok(apiResult);
    }

    @GetMapping("/list/apply-job")
    public ResponseEntity<ApiResult> getListApplyJob() {
        log.info("/candidate/list/apply-job");
        ApiResult apiResult = new ApiResult();
        apiResult.setObject(candidateService.getListApplyJob());
        log.info("Success");
        return  ResponseEntity.ok(apiResult);
    }

}
