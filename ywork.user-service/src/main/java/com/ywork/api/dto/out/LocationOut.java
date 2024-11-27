package com.ywork.api.dto.out;

import com.ywork.api.responsitory.helper.Col;
import lombok.Data;

@Data
public class LocationOut {
    @Col("code")
    private String code;
    @Col("name")
    private String name;
}
