package com.ywork.api.dto.in;

import lombok.Data;

@Data
public class CompanyGetIn {
    private String status;
    private String companyId;
    private String workId;
}
