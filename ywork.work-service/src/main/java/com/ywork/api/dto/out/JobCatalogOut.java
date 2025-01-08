package com.ywork.api.dto.out;

import com.ywork.api.responsitory.helper.Col;
import lombok.Data;

@Data
public class JobCatalogOut {
    @Col("id")
    private String id;
    @Col("name")
    private String name;
}
