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
    @Col("location")
    private String location;
    @Col("salary_min")
    private long salaryMin;
    @Col("salary_max")
    private long salaryMax;
    @Col("avatar")
    private String avatar;
    private List<LocationOut> locations;
    private List<SkillFieldOut> skills;
    private String urlAvatar;
    private int typeSalary;
    @Col("quantity")
    private String quantity;
    @Col("position")
    private String position;
    private String convertSalary;
    @Col("sex")
    private String sex;
    @Col("date_created")
    private String dateCreatedApply;
    @Col("date_update")
    private String dateUpdateApply;
    @Col("file")
    private String file;
    private String urlFile;
}
