package com.ywork.api.controller;

import com.ywork.api.dto.ApiResult;
import com.ywork.api.service.CareerService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@Slf4j
@RequestMapping("/career")
public class CareerController {
    private final CareerService careerService;
    @GetMapping("/list")
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