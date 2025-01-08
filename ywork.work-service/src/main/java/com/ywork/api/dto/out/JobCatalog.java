package com.ywork.api.dto.out;

import lombok.Data;

import java.util.List;

@Data
public class JobCatalog {
    private String group;
    private List<JobSubCatalog> jobs;
}
