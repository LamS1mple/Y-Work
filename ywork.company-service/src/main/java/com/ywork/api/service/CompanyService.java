package com.ywork.api.service;

import com.ywork.api.dto.in.CompanyIn;
import com.ywork.api.dto.out.CompanyOut;

import java.util.List;

public interface CompanyService {
    void createCompany(CompanyIn companyIn);
    List<CompanyOut> getAllCompanies();
}
