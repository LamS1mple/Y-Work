package com.ywork.api.dto.out;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ywork.api.responsitory.helper.Col;
import lombok.Data;

@Data
public class CVOut {
    @Col("infor")
    private String info;
    @Col("created_cv")
    @JsonProperty("createCV")
    private String createCV;
    @Col("update_cv")
    @JsonProperty("updateCV")
    private String updateCV;
    @Col("cv_id")
    private String cvId;
    @Col("status")
    private Integer status;
}
