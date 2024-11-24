package com.ywork.api.controller;

import com.ywork.api.dto.ApiResult;
import com.ywork.api.service.CandidateService;
import com.ywork.api.service.Impl.CareerService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@AllArgsConstructor
@Slf4j
@RequestMapping("/career")
public class CareerController {
    private final CareerService careerService;
    @PostMapping("/list")
    public ResponseEntity<ApiResult> getListCareer() {
        log.info("/career/list");
        var listCareer =  careerService.getListCareer();
        ApiResult apiResult = new ApiResult();
        apiResult.setObject(listCareer);
        log.info("Success");
        return  ResponseEntity.ok(apiResult);
    }

    @GetMapping("/skill")
    public ResponseEntity<ApiResult> getListSkill(@RequestParam String careerId) {
        log.info("/career/skill");
        var listSkill =  careerService.getSkill(careerId);
        ApiResult apiResult = new ApiResult();
        apiResult.setObject(listSkill);
        log.info("Success");
        return  ResponseEntity.ok(apiResult);
    }

}