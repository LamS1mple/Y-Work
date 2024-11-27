package com.ywork.api.service;

import com.ywork.api.dto.out.LocationOut;

import java.util.List;

public interface LocationService {
    List<LocationOut> getProvinceAndDistricts();
}
