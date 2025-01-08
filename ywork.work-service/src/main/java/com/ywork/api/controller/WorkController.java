package com.ywork.api.controller;

import com.ywork.api.dto.ApiResult;
import com.ywork.api.dto.in.UserIn;
import com.ywork.api.service.UserService;
import com.ywork.api.service.WorkService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.hc.core5.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@AllArgsConstructor
@RequestMapping("/public/work")
public class WorkController {
    private final WorkService workService;
    @GetMapping("/list")
    public ResponseEntity<ApiResult> createUser(){
        log.info("/work/list");
        var result =  workService.getListWork();
        ApiResult apiResult = new ApiResult();
        apiResult.setObject(result);
        log.info("Success");
        return  ResponseEntity.ok(apiResult);
    }

    @GetMapping("/detail")
    public ResponseEntity<ApiResult> detailWork(@RequestParam String workId){
        log.info("/work/detail");
        var result = workService.getDetail(workId);
        ApiResult apiResult = new ApiResult();
        apiResult.setObject(result);
        log.info("Success");
        return  ResponseEntity.ok(apiResult);
    }

    @GetMapping("/status")
    public ResponseEntity<ApiResult> updateWorkStatus(@RequestParam String workId){
        log.info("/work/status");
        workService.changeStatus(workId);
        log.info("Success");
        return  ResponseEntity.ok(new ApiResult());
    }
    @GetMapping("/company/list")
    public ResponseEntity<ApiResult> getListWorkCompany(@RequestParam String companyId){
        log.info("/work/company/list");
        var result =  workService.getListWorkCompany(companyId);
        ApiResult apiResult = new ApiResult();
        apiResult.setObject(result);
        log.info("Success");
        return  ResponseEntity.ok(apiResult);
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResult> getListWorkSearch(@RequestParam String key){
        log.info("/public/work/search");
        var result = workService.getListWorkSearch(key);
        ApiResult apiResult = new ApiResult();
        apiResult.setObject(result);
        log.info("Success");
        return  ResponseEntity.ok(apiResult);
    }


}
