package com.ywork.api.responsitory;

import com.ywork.api.dto.out.WorkStatisticOut;
import com.ywork.api.responsitory.helper.ProceduceCall;
import com.ywork.api.responsitory.helper.ProcedureParameter;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.stereotype.Repository;

import java.util.List;

@AllArgsConstructor
@Repository
public class StatisticRepository {
    private final ProceduceCall proceduceCall;

    public List<WorkStatisticOut> statisticWork(String companyId) {
        var out_put = proceduceCall.callOneRefCursor("statistic_work",
                List.of(ProcedureParameter.inputParam("in_company_id", String.class, companyId),
                        ProcedureParameter.refCursorParam("out_cur")), WorkStatisticOut.class);
        return  (List<WorkStatisticOut>)out_put.get("out_cur");
    }
}
