package com.ywork.api.service.Impl;

import com.ywork.api.dto.out.CareerOut;
import com.ywork.api.dto.out.JobCatalog;
import com.ywork.api.dto.out.JobCatalogOut;
import com.ywork.api.dto.out.JobSubCatalog;
import com.ywork.api.responsitory.CareerRepository;
import com.ywork.api.service.CareerService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
@AllArgsConstructor
public class CareerImpl implements CareerService {
    private final CareerRepository careerRepository;
    @Override
    public List<CareerOut> getListCareer() {
        return careerRepository.getListCareer();
    }

    @Override
    public List<CareerOut> getSkill(String careerId) {
        return careerRepository.getListCareer(careerId);
    }

    @Override
    public List<JobCatalog> getJobCatalog() {
        List<JobCatalogOut> careerList = careerRepository.getListSearchCareer();
        List<JobCatalog> jobCatalogList = new ArrayList<>();
        for (JobCatalogOut jobCatalogOut : careerList) {
            JobCatalog jobCatalog = new JobCatalog();
            jobCatalog.setGroup(jobCatalogOut.getName());
            List<JobCatalogOut> fieldList = careerRepository.getListSearchField(jobCatalogOut.getId());
            List<JobSubCatalog> jobSubCatalogList = new ArrayList<>();
            for (JobCatalogOut fieldOut : fieldList){
                JobSubCatalog jobSubCatalog = new JobSubCatalog();
                jobSubCatalog.setName(fieldOut.getName());
                jobSubCatalog.setSubJobs(careerRepository.getListSearchSkill(fieldOut.getId()).stream().map(JobCatalogOut::getName).toList());
                jobSubCatalogList.add(jobSubCatalog);
            }
            jobCatalog.setJobs(jobSubCatalogList);
            jobCatalogList.add(jobCatalog);
        }
        return jobCatalogList;
    }
}
