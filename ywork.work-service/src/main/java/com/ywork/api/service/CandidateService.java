package com.ywork.api.service;

import com.ywork.api.dto.out.WorkOut;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CandidateService {
    void applyCandidate(MultipartFile file, String workId, String optionUpload);

    List<WorkOut> getListApplyJob();
}
