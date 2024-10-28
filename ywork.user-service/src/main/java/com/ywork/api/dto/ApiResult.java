package com.ywork.api.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class ApiResult {
    private String messages = "ok";
    private Object object;
}
