package com.ywork.api.dto.in;

import lombok.Data;

@Data
public class CompanyIn {
    private String name;
    private String description;
    private String locationDetail;
    private String quanityStaff;
    private String wardCode;
}
