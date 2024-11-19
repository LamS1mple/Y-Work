package com.ywork.api.service.Impl;

import com.ywork.api.dto.out.WorkOut;
import com.ywork.api.model.UserOut;
import com.ywork.api.responsitory.ApplyRepository;
import com.ywork.api.responsitory.WorkRepository;
import com.ywork.api.service.CandidateService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@AllArgsConstructor
@Slf4j
public class CandidateImpl implements CandidateService {
    private final MinioUtils minioUtils;
    private final WorkRepository workRepository;
    private final ApplyRepository applyRepository;
    @Override
    public void applyCandidate(MultipartFile file, String workId, String optionUpload) {
        String[] fileName = file.getOriginalFilename().split("\\.");
        String dotFile = fileName[fileName.length - 1];
        String objectName = System.currentTimeMillis()+"." + dotFile;
        WorkOut workOut = workRepository.getDetailWork(workId);
        minioUtils.uploadFile(workOut.getCompanyId(), objectName, file);
        UserOut userOut =(UserOut) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        applyRepository.createCandidateFile(userOut.getUserId(),workId, objectName);

    }
}
