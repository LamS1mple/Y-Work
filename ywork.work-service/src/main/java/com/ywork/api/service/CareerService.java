package com.ywork.api.service;

import com.ywork.api.dto.out.CareerOut;
import com.ywork.api.dto.out.JobCatalog;

import java.util.List;

public interface CareerService {
    List<CareerOut> getListCareer();
    List<CareerOut> getSkill(String careerId);

    List<JobCatalog> getJobCatalog();
}
