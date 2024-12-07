package com.ywork.api.service;

import com.ywork.api.dto.in.CompanyGetIn;
import com.ywork.api.dto.out.CompanyOut;
import org.springframework.stereotype.Service;

import java.util.List;

public interface  CompanySearchService {
    List<CompanyOut> getListCompany(String status);

    void companyApply(CompanyGetIn companyGetIn);

    void companyApplyChangeStatus(CompanyGetIn companyGetIn);
}
