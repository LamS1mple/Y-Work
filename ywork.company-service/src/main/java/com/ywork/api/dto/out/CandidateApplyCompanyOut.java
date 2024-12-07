package com.ywork.api.dto.out;

import com.ywork.api.responsitory.helper.Col;
import lombok.Data;

@Data
public class CandidateApplyCompanyOut {
    @Col("user_id")
    private String userId;
    @Col("company_manager_id")
    private String companyManagerId;
    @Col("email")
    private String email;
    @Col("phone_number")
    private String phoneNumber;
    @Col("name_account")
    private String nameAccount;
    @Col("role_name")
    private String roleName;
    @Col("role_id")
    private String roleId;
    @Col("avatar")
    private String avatar;
    private String urlAvtar;
    @Col("date_created")
    private String dateCreated;
    @Col("status")
    private Integer status;
}
