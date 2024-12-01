package com.ywork.api.dto.in;

import lombok.Data;

@Data
public class CandidateIn {
    private String companyId;
    private String workId;

    private String candidateId;
    private Integer status;
}
