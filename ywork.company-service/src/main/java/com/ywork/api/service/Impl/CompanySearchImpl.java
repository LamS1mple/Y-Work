package com.ywork.api.service.Impl;

import com.ywork.api.dto.out.CompanyOut;
import com.ywork.api.dto.out.UserOut;
import com.ywork.api.responsitory.CompanySearchRepository;
import com.ywork.api.service.CompanySearchService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CompanySearchImpl implements CompanySearchService {
    private final CompanySearchRepository companySearchRepository;
    private final MinioUtils minioUtils;
    @Override
    public List<CompanyOut> getListCompany(String status) {
        UserOut userOut =(UserOut) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<CompanyOut> companyOutList = companySearchRepository.getCompanySearch(status, userOut.getUserId());
        companyOutList.forEach(companyOut -> companyOut.setUrlAvatar(
                minioUtils.getUrlFile(companyOut.getIdCompany(), companyOut.getAvatar())));
        return companyOutList;
    }
}
