package com.ywork.api.service.Impl;

import com.ywork.api.dto.out.CareerOut;

import java.util.List;

public interface CareerService {
    List<CareerOut> getListCareer();
    List<CareerOut> getSkill(String careerId);
}
