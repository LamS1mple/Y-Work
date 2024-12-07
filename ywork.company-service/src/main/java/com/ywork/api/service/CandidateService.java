package com.ywork.api.service;

import com.ywork.api.dto.in.CandidateIn;
import com.ywork.api.dto.out.CandidateApplyCompanyOut;
import com.ywork.api.dto.out.CandidateOut;

import java.util.List;

public interface CandidateService {
    List<CandidateOut> getCandidates(CandidateIn candidateIn);

    void changeStatus(CandidateIn candidateIn);

    List<CandidateApplyCompanyOut> getListApplyCompany(String companyId);

    void changeStatusApplyCompany(CandidateIn candidateIn);
}
