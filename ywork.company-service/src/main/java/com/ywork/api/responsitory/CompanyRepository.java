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

    public String createCompany(CompanyIn companyIn, String userId){
        var out_put = proceduceCall.callNoRefCursor("company_created",
                List.of(ProcedureParameter.inputParam("in_name", String.class, companyIn.getCompanyName()),
                        ProcedureParameter.inputParam("in_description", String.class, companyIn.getDescription()),
                        ProcedureParameter.inputParam("in_user_id", String.class, userId),
                        ProcedureParameter.inputParam("in_ward_code", String.class, companyIn.getWard()),
                        ProcedureParameter.inputParam("in_quantity_staff", String.class, companyIn.getQuantityStaff()),
                        ProcedureParameter.inputParam("in_location_detail", String.class, companyIn.getAddress()),
                        ProcedureParameter.inputParam("in_avatar", String.class, companyIn.getUrlAvatar()),
                        ProcedureParameter.outputParam("out_result", String.class),
                        ProcedureParameter.outputParam("out_company_id", String.class)));

        String result = (String) out_put.get("out_result");
        if (!DataStatus.SUCCESS.equals(result)) throw new RuntimeException("Fail create company");
        return (String) out_put.get("out_company_id");
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

    public CompanyOut detailCompany(String companyId) {
        var out_put = proceduceCall.callOneRefCursor("company_detail",
                List.of(ProcedureParameter.inputParam("in_company_id", String.class, companyId ),
                        ProcedureParameter.outputParam("out_result", String.class),
                        ProcedureParameter.refCursorParam("out_cur")),
                CompanyOut.class);

        String result = (String) out_put.get("out_result");
        if (!DataStatus.SUCCESS.equals(result)) return null;
        List<CompanyOut> companyOutList =(List<CompanyOut>) out_put.get("out_cur");
        if (companyOutList.isEmpty()){
            throw new RuntimeException("Not found company");
        }
        return companyOutList.get(0);
    }

    public List<CompanyOut> getAllConpaniesPublic() {
        var out_put = proceduceCall.callOneRefCursor("company_list_public",
                List.of(ProcedureParameter.refCursorParam("out_cur")),
                CompanyOut.class);
        return (List<CompanyOut>) out_put.get("out_cur");
    }
}
