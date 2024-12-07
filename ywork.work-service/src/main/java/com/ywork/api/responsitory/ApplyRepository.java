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
public class ApplyRepository {
    private final ProceduceCall proceduceCall;
    public void createCandidateFile(String userId, String workId, String urlFile){
        var out_put = proceduceCall.callNoRefCursor("create_file_candidate",
                List.of(ProcedureParameter.inputParam("in_user_id",String.class, userId),
                        ProcedureParameter.inputParam("in_work_id", String.class, workId),
                        ProcedureParameter.inputParam("in_file", String.class, urlFile),
                        ProcedureParameter.outputParam("out_result", String.class)));
        String result = (String) out_put.get("out_result");
        if (!DataStatus.SUCCESS.equals(result)){
            throw new RuntimeException("Fail create file candidate");
        }
    }

    public List<WorkOut> listApplyJob(String userId){
        var out_put = proceduceCall.callOneRefCursor("candidate_list_apply",
                List.of(ProcedureParameter.inputParam("in_user_id",String.class, userId),
                        ProcedureParameter.refCursorParam("out_cur")), WorkOut.class);
//        String result = (String) out_put.get("out_result");
//        if (!DataStatus.SUCCESS.equals(result)){
//            throw new RuntimeException("Fail get list apply job");
//        }
        return (List<WorkOut>) out_put.get("out_cur");
    }
}
