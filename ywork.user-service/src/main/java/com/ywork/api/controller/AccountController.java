package com.ywork.api.controller;

import com.ywork.api.dto.ApiResult;
import com.ywork.api.dto.in.RegisterAccount;
import com.ywork.api.dto.in.UserIn;
import com.ywork.api.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@AllArgsConstructor
@RequestMapping("/public/account")
public class AccountController {
    private final UserService userService;
    @PostMapping("/create-user")
    public ResponseEntity<ApiResult> createUser(@RequestBody UserIn userIn){
        log.info("/account/create-user");
        userService.createUser(userIn);
        ApiResult apiResult = new ApiResult();
        log.info("Success");
        return  ResponseEntity.ok(apiResult);
    }
    @PostMapping("/login")
    public  ResponseEntity<ApiResult> infor(@RequestBody UserIn userIn){
        log.info("/account/login");
        ApiResult apiResult = new ApiResult();
        apiResult.setObject(userService.getUser(userIn));
        log.info("Success");
        return  ResponseEntity.ok(apiResult);
    }
    @PostMapping("/login/company")
    public  ResponseEntity<ApiResult> getUserCompany(@RequestBody UserIn userIn){
        log.info("/account/login/company");
        ApiResult apiResult = new ApiResult();
        apiResult.setObject(userService.loginCompany(userIn));
        log.info("Success");
        return  ResponseEntity.ok(apiResult);
    }


}
