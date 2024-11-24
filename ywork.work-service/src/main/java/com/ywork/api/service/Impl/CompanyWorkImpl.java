package com.ywork.api.service.Impl;

import com.ywork.api.dto.out.WorkOut;
import com.ywork.api.responsitory.CompanyWorkRepository;
import com.ywork.api.service.CompanyWorkService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CompanyWorkImpl implements CompanyWorkService {
    private final CompanyWorkRepository companyWorkRepository;
    @Override
    public List<WorkOut> getListJobCompany(String companyId) {

        return companyWorkRepository.getJobCompany(companyId);
    }
}
