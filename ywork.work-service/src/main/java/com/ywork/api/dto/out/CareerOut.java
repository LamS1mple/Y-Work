package com.ywork.api.dto.out;

import com.ywork.api.responsitory.helper.Col;
import lombok.Data;

@Data
public class CareerOut {
    @Col("career_id")
    private String careerId;
    @Col("career_name")
    private String careerName;

    @Col("skill_id")
    private String skillId;
    @Col("skill_name")
    private String skillName;
}
