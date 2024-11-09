package com.ywork.api.responsitory;

import com.ywork.api.dto.in.CompanyIn;
import com.ywork.api.dto.out.CompanyOut;
import com.ywork.api.dto.out.UserOut;
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
                        ProcedureParameter.inputParam("in_description", String.class, companyIn.getDescription()),
                        ProcedureParameter.inputParam("in_user_id", String.class, userId),
                        ProcedureParameter.inputParam("in_ward_code", String.class, companyIn.getWardCode()),
                        ProcedureParameter.inputParam("in_quanlity_staff", String.class, companyIn.getQuanityStaff()),
                        ProcedureParameter.inputParam("in_location_detail", String.class, companyIn.getLocationDetail()),
                        ProcedureParameter.outputParam("out_result", String.class)));

        String result = (String) out_put.get("out_result");
        if (!DataStatus.SUCCESS.equals(result)) return;

    }

    public List<CompanyOut> getAllConpaniesUser(UserOut userOut) {
        var out_put = proceduceCall.callOneRefCursor("company_list_user",
                List.of(ProcedureParameter.inputParam("in_user_id", String.class, userOut.getUserId() ),
                        ProcedureParameter.outputParam("out_result", String.class),
                        ProcedureParameter.refCursorParam("out_cur")),
                CompanyOut.class);

        String result = (String) out_put.get("out_result");
        if (!DataStatus.SUCCESS.equals(result)) return null;
        return (List<CompanyOut>) out_put.get("out_cur");
    }
}
