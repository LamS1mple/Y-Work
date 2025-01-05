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
@RequestMapping("/public/location")
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

    @GetMapping("/province")
    public ResponseEntity<ApiResult> getProvince() {
        log.info("/location/province");
        ApiResult apiResult = new ApiResult();
        apiResult.setObject(locationService.getProvince());
        log.info("success");
        return ResponseEntity.ok(apiResult);
    }

    @GetMapping("/district")
    public ResponseEntity<ApiResult> getDistrict(String provinceId) {
        log.info("/location/district");
        ApiResult apiResult = new ApiResult();
        apiResult.setObject(locationService.getDistrict(provinceId));
        log.info("success");
        return ResponseEntity.ok(apiResult);
    }
    @GetMapping("/ward")
    public ResponseEntity<ApiResult> getWard( String districtId) {
        log.info("/location/ward");
        ApiResult apiResult = new ApiResult();
        apiResult.setObject(locationService.getWard(districtId));
        log.info("success");
        return ResponseEntity.ok(apiResult);
    }
}
