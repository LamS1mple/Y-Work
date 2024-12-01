package com.ywork.api.service;

import com.ywork.api.dto.in.CandidateIn;
import com.ywork.api.dto.out.CandidateOut;

import java.util.List;

public interface CandidateService {
    List<CandidateOut> getCandidates(CandidateIn candidateIn);

    void changeStatus(CandidateIn candidateIn);
}
