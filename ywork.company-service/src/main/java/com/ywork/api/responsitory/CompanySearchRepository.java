package com.ywork.api.responsitory;

import com.ywork.api.dto.out.CompanyOut;
import com.ywork.api.responsitory.helper.ProceduceCall;
import com.ywork.api.responsitory.helper.ProcedureParameter;
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
}
