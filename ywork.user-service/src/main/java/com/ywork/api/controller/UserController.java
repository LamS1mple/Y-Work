package com.ywork.api.controller;

import com.ywork.api.dto.ApiResult;
import com.ywork.api.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
