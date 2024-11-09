package com.ywork.api.dto.out;

import com.ywork.api.responsitory.helper.Col;
import lombok.Data;

@Data
public class LocationOut {
    @Col("ward_code")
    private String wardCode;
    @Col("district_code")
    private String districtCode;
    @Col("province_code")
    private String provinceCode;
    @Col("ward_name")
    private String wardName;
    @Col("district_name")
    private String districtName;
    @Col("province_name")
    private String provinceName;

}
