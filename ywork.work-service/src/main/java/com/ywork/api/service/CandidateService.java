package com.ywork.api.service;

import org.springframework.web.multipart.MultipartFile;

public interface CandidateService {
    void applyCandidate(MultipartFile file, String workId, String optionUpload);
}
