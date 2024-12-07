package com.ywork.api.responsitory;

import com.ywork.api.dto.out.CompanyOut;
import com.ywork.api.responsitory.helper.ProceduceCall;
import com.ywork.api.responsitory.helper.ProcedureParameter;
import com.ywork.common.DataStatus.DataStatus;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@AllArgsConstructor
public class CompanySearchRepository {
    private final ProceduceCall proceduceCall;
    public List<CompanyOut> getCompanySearch(String status, String user_id){
        var out_put = proceduceCall.callOneRefCursor("company_owner_search",
                List.of(ProcedureParameter.inputParam("in_status", String.class, status),
                        ProcedureParameter.inputParam("in_user_id", String.class, user_id),
                        ProcedureParameter.refCursorParam("out_cur")),
                CompanyOut.class);
        return (List<CompanyOut>) out_put.get("out_cur");
    }

    public void applyCompany(String userId, String companyId) {
        var out_put = proceduceCall.callNoRefCursor("company_apply",
                List.of(ProcedureParameter.inputParam("in_user_id", String.class, userId),
                        ProcedureParameter.inputParam("in_company_id", String.class, companyId),
                        ProcedureParameter.outputParam("out_result", String.class)));
        String result = (String) out_put.get("out_result");
        if (!DataStatus.SUCCESS.equals(result)) throw new RuntimeException("Fail apply company");
    }

    public void applyCompanyChangeStatus(String userId, String companyId, String status) {
        var out_put = proceduceCall.callNoRefCursor("company_apply_change_status",
                List.of(ProcedureParameter.inputParam("in_user_id", String.class, userId),
                        ProcedureParameter.inputParam("in_company_id", String.class, companyId),
                        ProcedureParameter.inputParam("in_status", String.class, status),
                        ProcedureParameter.outputParam("out_result", String.class)));
        String result = (String) out_put.get("out_result");
        if (!DataStatus.SUCCESS.equals(result)) throw new RuntimeException("Fail company change status");
    }
}
