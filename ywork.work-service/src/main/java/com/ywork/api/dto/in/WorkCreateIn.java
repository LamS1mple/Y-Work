package com.ywork.api.dto.in;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class WorkCreateIn {
    private List<KeyValue> areas;
    private String candidateBenefits;
    private String candidateRequirements;
    private Date expirationDate;
    private KeyValue gender;
    private String jobDescription;
    private String jobTitle;
    private KeyValue jobType;
    private KeyValue mainIndustry;
    private String recruitmentNumber;
    private Long salaryMax;
    private Long salaryMin;
    private List<KeyValue> subIndustry;
    private String workLocation;
    private String companyId;
    private KeyValue experience;
    private String jobPosition;
}
