package com.ywork.api.service.Impl;

import com.ywork.api.dto.in.CompanyIn;
import com.ywork.api.dto.out.CompanyOut;
import com.ywork.api.dto.out.UserOut;
import com.ywork.api.responsitory.CompanyRepository;
import com.ywork.api.responsitory.LocationRepository;
import com.ywork.api.service.CompanyService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CompanyImpl implements CompanyService {
    private final CompanyRepository companyRepository;
    private final LocationRepository locationRepository;
    @Override
    public void createCompany(CompanyIn companyIn) {
        UserOut userOut = (UserOut) SecurityContextHolder.getContext().getAuthentication().getPrincipal() ;
        companyRepository.createCompany(companyIn, userOut.getUserId());
    }

    @Override
    public List<CompanyOut> getAllCompanies() {
        UserOut userOut = (UserOut) SecurityContextHolder.getContext().getAuthentication().getPrincipal() ;

        return companyRepository.getAllConpaniesUser(userOut);
    }

    @Override
    public Object detailCompany(String companyId) {
        CompanyOut companyOut = companyRepository.detailCompany(companyId);
        return companyOut;
    }
}
