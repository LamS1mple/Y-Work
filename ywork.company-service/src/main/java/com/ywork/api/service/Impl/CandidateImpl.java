package com.ywork.api.service.Impl;

import com.ywork.api.dto.in.CandidateIn;
import com.ywork.api.dto.out.CandidateOut;
import com.ywork.api.responsitory.CandidateRepository;
import com.ywork.api.service.CandidateService;
import com.ywork.config.MinioConfig;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@AllArgsConstructor
@Slf4j
public class CandidateImpl implements CandidateService {
    private final CandidateRepository candidateRepository;
    private final MinioUtils minioUtils;
    @Override
    public List<CandidateOut> getCandidates(CandidateIn candidateIn) {
        List<CandidateOut> candidateOutList = candidateRepository.getCandidate(candidateIn.getWorkId());
        for (CandidateOut candidateOut : candidateOutList) {
            candidateOut.setUrlAvatar(minioUtils.getUrlFile(MinioConfig.BUCKET_USER,candidateOut.getAvatar()));
            candidateOut.setUrlFile(minioUtils.getUrlFile(candidateIn.getCompanyId(), candidateOut.getFile()));
        }
        return candidateOutList;
    }

    @Override
    public void changeStatus(CandidateIn candidateIn) {
        candidateRepository.changeStatus(candidateIn);
    }
}
