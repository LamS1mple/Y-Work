package com.ywork.api.service.Impl;

import com.ywork.api.dto.out.LocationOut;
import com.ywork.api.responsitory.LocationRepository;
import com.ywork.api.service.LocationService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class LocationImpl implements LocationService {
    private final LocationRepository locationRepository;
    @Override
    public List<LocationOut> getProvinceAndDistricts() {
        return locationRepository.getProvinceAndDistrict();
    }
}
