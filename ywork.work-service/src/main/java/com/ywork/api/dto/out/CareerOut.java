package com.ywork.api.dto.out;

import com.ywork.api.responsitory.helper.Col;
import lombok.Data;

@Data
public class CareerOut {
    @Col("careerId")
    private String careerId;
    @Col("career_name")
    private String careerName;

    @Col("skill_id")
    private String skillId;
    @Col("name_skill")
    private String skillName;
}
