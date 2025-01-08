package com.ywork.api.service;

import com.ywork.api.dto.in.WorkCreateIn;
import com.ywork.api.dto.out.JobCatalog;
import com.ywork.api.dto.out.WorkOut;

import java.util.List;

public interface WorkService {
    List<WorkOut> getListWork();

    Object getDetail(String workId);

    void createWork(WorkCreateIn workCreateIn);

    void changeStatus(String workId);

    List<WorkOut> getListWorkCompany(String companyId);

    void deleteJob(String workId);

    List<WorkOut> getListWorkSearch(String key);

    List<JobCatalog> getJobCatalog();
}
