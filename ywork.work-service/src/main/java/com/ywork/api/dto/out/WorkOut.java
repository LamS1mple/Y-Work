package com.ywork.api.dto.out;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ywork.api.responsitory.helper.Col;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class WorkOut {
    @Col("company_id")
    private String companyId;
    @Col("name_company")
    private String nameCompany;
    @Col("work_id")
    private String workId;
    @Col("name_work")
    private String nameWork;
    @Col("description")
    private String description;
    @Col("wage")
    private String wage;
    @JsonFormat(pattern = "dd/MM/yyyy")
    @Col("due_date")
    private LocalDateTime dueDate;
    @Col("experience")
    private String experience;
    @Col("benefits")
    private String benefits;
    @Col("requirements")
    private String requirements;
    @Col("work_location")
    private String workLocation;
    @Col("status")
    private Integer status;
    @Col("quantity_candidate")
    private Long quantityCandidate;

    private List<LocationOut> locations;
    private List<SkillFieldOut> skills;
}
