package com.ywork.api.service;

import com.ywork.api.dto.out.WorkOut;

import java.util.List;

public interface  CompanyWorkService {
    List<WorkOut> getListJobCompany(String companyId);
}
