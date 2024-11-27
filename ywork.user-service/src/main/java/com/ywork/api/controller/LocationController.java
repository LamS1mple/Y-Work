package com.ywork.api.controller;

import com.ywork.api.dto.ApiResult;
import com.ywork.api.service.LocationService;
import com.ywork.api.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/location")
@AllArgsConstructor
@Slf4j
public class LocationController {
    private final LocationService locationService;
    @GetMapping("/list-province-district")
    public ResponseEntity<ApiResult> getProvinceDistrict() {
        log.info("/location/list-province-district");
        ApiResult apiResult = new ApiResult();
        apiResult.setObject(locationService.getProvinceAndDistricts());
        log.info("success");
        return ResponseEntity.ok(apiResult);
    }
}
