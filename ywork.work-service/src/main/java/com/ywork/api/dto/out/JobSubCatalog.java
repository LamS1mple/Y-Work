package com.ywork.api.dto.out;

import lombok.Data;

import java.util.List;
@Data
public class JobSubCatalog {
    private String name;
    private List<String> subJobs;
}
