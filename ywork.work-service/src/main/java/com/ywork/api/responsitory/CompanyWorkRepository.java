package com.ywork.api.responsitory;

import com.ywork.api.dto.out.WorkOut;
import com.ywork.api.responsitory.helper.ProceduceCall;
import com.ywork.api.responsitory.helper.ProcedureParameter;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@AllArgsConstructor
public class CompanyWorkRepository {
    private final ProceduceCall proceduceCall;

    public List<WorkOut> getJobCompany(String companyId){
        var out_put = proceduceCall.callOneRefCursor("company_list_work",
                List.of(ProcedureParameter.inputParam("in_company_id", String.class, companyId),
                        ProcedureParameter.refCursorParam("out_cur")), WorkOut.class);

        return (List<WorkOut>) out_put.get("out_cur");
    }

}
