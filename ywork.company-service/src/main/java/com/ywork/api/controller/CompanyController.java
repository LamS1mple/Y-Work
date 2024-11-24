package com.ywork.api.controller;

import com.ywork.api.dto.ApiResult;
import com.ywork.api.dto.in.CompanyIn;
import com.ywork.api.dto.in.UserIn;
import com.ywork.api.service.CompanyService;
import com.ywork.api.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@Slf4j
@AllArgsConstructor
@RequestMapping("/company")
public class CompanyController {
    private final CompanyService companyService;
    @PostMapping("/create-company")
    public ResponseEntity<ApiResult> createUser(@RequestPart  String companyName,
                                                @RequestPart String description,
                                                @RequestPart String address,
                                                @RequestPart String quantityStaff,
                                                @RequestPart String ward,
                                                @RequestPart MultipartFile avatar){
        log.info("/company/create-company");
        CompanyIn companyIn = CompanyIn.builder().companyName(companyName)
                .address(address)
                .ward(ward)
                .description(description)
                .quantityStaff(quantityStaff)
                .avatar(avatar).build();
        companyService.createCompany(companyIn);
        ApiResult apiResult = new ApiResult();
        log.info("Success");
        return  ResponseEntity.ok(apiResult);
    }

    @GetMapping("/list-company")
    public ResponseEntity<ApiResult> getCompanyList(){
        log.info("/company/list-company");
        ApiResult apiResult = new ApiResult();
        apiResult.setObject(companyService.getAllCompanies());
        log.info("Success");
        return  ResponseEntity.ok(apiResult);
    }



}
