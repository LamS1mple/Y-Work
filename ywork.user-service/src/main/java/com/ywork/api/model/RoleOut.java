package com.ywork.api.dto.out;

import com.ywork.api.responsitory.helper.Col;
import lombok.Data;

@Data
public class RoleOut {
    @Col("role_id")
    private String role_id;
    @Col("name")
    private String name;
}
