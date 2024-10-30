package com.ywork.api.responsitory;

import com.ywork.api.dto.in.CompanyIn;
import com.ywork.api.responsitory.helper.ProceduceCall;
import com.ywork.api.responsitory.helper.ProcedureParameter;
import com.ywork.common.DataStatus.DataStatus;
import lombok.AllArgsConstructor;
import org.hibernate.procedure.ProcedureCall;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@AllArgsConstructor
public class CompanyRepository {
    private final ProceduceCall proceduceCall;

    public void createCompany(CompanyIn companyIn, String userId){
        var out_put = proceduceCall.callNoRefCursor("company_created",
                List.of(ProcedureParameter.inputParam("in_name", String.class, companyIn.getName()),
                        ProcedureParameter.inputParam("in_desciption", String.class, companyIn.getDescription()),
                        ProcedureParameter.inputParam("in_user_id", String.class, userId),
                        ProcedureParameter.inputParam("in_ward_code", String.class, companyIn.getWardCode()),
                        ProcedureParameter.inputParam("quanlity_staff", String.class, companyIn.getQuanityStaff()),
                        ProcedureParameter.inputParam("in_location_detail", String.class, companyIn.getLocationDetail()),
                        ProcedureParameter.outputParam("out_result", String.class)));

        String result = (String) out_put.get("out_result");
        if (!DataStatus.SUCCESS.equals(result)) return;

    }
}
