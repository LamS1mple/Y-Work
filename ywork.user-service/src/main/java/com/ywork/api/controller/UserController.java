package com.ywork.api.controller;

import com.ywork.api.dto.ApiResult;
import com.ywork.api.dto.in.CVIn;
import com.ywork.api.dto.in.UserUpdate;
import com.ywork.api.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/user")
@AllArgsConstructor
@Slf4j
public class UserController {
    private final UserService userService;
    @GetMapping("/detail")
    public ResponseEntity<ApiResult> detailUser(){
        log.info("/user/detail");
        ApiResult apiResult = new ApiResult();
        apiResult.setObject(userService.getDetailUser());
        log.info("success");
        return ResponseEntity.ok(apiResult);
    }
    @PostMapping("/save-cv")
    public ResponseEntity<?> saveCV(@RequestBody CVIn cv){
        log.info("/user/cv");
        userService.saveCV(cv);
        log.info("success");
        return ResponseEntity.ok(Collections.emptyMap());
    }

    @PostMapping("/change/cv")
    public ResponseEntity<?> changeCV(@RequestBody CVIn cv){
        log.info("/user/change/cv");
        userService.changeCV(cv);
        log.info("success");
        return ResponseEntity.ok(Collections.emptyMap());
    }

    @GetMapping("/cv/list")
    public ResponseEntity<?> listCV(){
        log.info("/user/cv/list");
        ApiResult apiResult = new ApiResult();
        apiResult.setObject(userService.listCV());
        log.info("success");
        return ResponseEntity.ok(apiResult);
    }

    @GetMapping("/cv-recommend")
    public ResponseEntity<?> recommendCV(){
        log.info("/user/cv/recommend");
        ApiResult apiResult = new ApiResult();
        apiResult.setObject(userService.getCVRecommend());
        log.info("success");
        return ResponseEntity.ok(apiResult);
    }

    @GetMapping("/cv/detail")
    public ResponseEntity<?> listUser(String cvId){
        log.info("/user/cv/detail");
        ApiResult apiResult = new ApiResult();
        apiResult.setObject(userService.getCV(cvId));
        log.info("success");

        return ResponseEntity.ok(apiResult);
    }
    @PostMapping("/cv/status")
    public ResponseEntity<?> changeStatus(@RequestBody CVIn cv){
        log.info("/user/cv/status");
        ApiResult apiResult = new ApiResult();
        userService.changeStatus(cv);
        log.info("success");

        return ResponseEntity.ok(apiResult);
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateUser( UserUpdate user){
        log.info("/user/update");
        ApiResult apiResult = new ApiResult();
        userService.updateUser(user);
        log.info("success");
        return ResponseEntity.ok(apiResult);
    }

    @PostMapping("/cv/delete")
    public ResponseEntity<?> deleteCV(@RequestBody CVIn cv){
        log.info("/user/cv/delete");
        ApiResult apiResult = new ApiResult();
        userService.cvDelete(cv.getCvId());
        log.info("success");

        return ResponseEntity.ok(apiResult);
    }
}
