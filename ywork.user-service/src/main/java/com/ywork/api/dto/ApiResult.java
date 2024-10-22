package com.ywork.api.dto;

import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@Builder
@RequiredArgsConstructor
public class ApiResult {
    private String messages = "GOOD";
    private Object object;
}
