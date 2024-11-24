package com.ywork.api.service;

import com.ywork.api.dto.out.CompanyOut;
import org.springframework.stereotype.Service;

import java.util.List;

public interface  CompanySearchService {
    List<CompanyOut> getListCompany(String status);

}
