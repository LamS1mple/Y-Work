package com.ywork.api.responsitory;

import com.ywork.api.dto.out.WorkOut;
import com.ywork.api.responsitory.helper.ProceduceCall;
import com.ywork.api.responsitory.helper.ProcedureParameter;
import com.ywork.common.DataStatus.DataStatus;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@AllArgsConstructor
public class WorkRepository {
    private final ProceduceCall proceduceCall;
    public List<WorkOut> getListWork(){
        var out_put = proceduceCall.callOneRefCursor("work_list_search",
                List.of(ProcedureParameter.outputParam("out_reuslt", String.class),
                        ProcedureParameter.refCursorParam("out_cur")), WorkOut.class);
        String result = (String) out_put.get("out_result");
        if (!DataStatus.SUCCESS.equals(result)) {

        }
        return (List<WorkOut>) out_put.get("out_cur");
    }

    public WorkOut getDetailWork(String workId) {
        var out_put = proceduceCall.callOneRefCursor("work_detail",
                List.of(ProcedureParameter.inputParam("in_work_id", String.class, workId),
                        ProcedureParameter.outputParam("out_reuslt", String.class),
                        ProcedureParameter.refCursorParam("out_cur")), WorkOut.class);
        String result = (String) out_put.get("out_result");
        if (!DataStatus.SUCCESS.equals(result)) {

        }
        List<WorkOut> workOutList = (List<WorkOut>) out_put.get("out_cur");
        if (workOutList.isEmpty()){
            throw new RuntimeException("Not found work");
        }
        return workOutList.get(0);
    }
}
