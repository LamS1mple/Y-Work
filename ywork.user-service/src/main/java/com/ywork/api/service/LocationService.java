package com.ywork.api.service;

import com.ywork.api.dto.out.LocationOut;

import java.util.List;

public interface LocationService {
    List<LocationOut> getProvinceAndDistricts();

    List<LocationOut> getDistrict(String provinceId);

    List<LocationOut> getWard(String districtId);

    List<LocationOut> getProvince();
}
