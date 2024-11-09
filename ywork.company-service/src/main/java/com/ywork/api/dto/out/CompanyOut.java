package com.ywork.api.dto.out;

import com.ywork.api.responsitory.helper.Col;
import lombok.Data;

@Data
public class CompanyOut {
    @Col("company_id")
    private String idCompany;
    @Col("name")
    private String nameCompany;
    @Col("description")
    private String descriptionCompany;
    @Col("location_detail")
    private String locationDetailCompany;
    @Col("quantity_staff")
    private String quantityStaff;
    @Col("name_ward")
    private String nameWard;
    @Col("name_district")
    private String nameDistrict;
    @Col("name_province")
    private String nameProvince;
}
