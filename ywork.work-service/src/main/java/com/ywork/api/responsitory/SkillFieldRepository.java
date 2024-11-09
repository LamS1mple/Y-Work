package com.ywork.api.responsitory;

import com.ywork.api.dto.out.SkillFieldOut;
import com.ywork.api.responsitory.helper.ProceduceCall;
import com.ywork.api.responsitory.helper.ProcedureParameter;
import com.ywork.common.DataStatus.DataStatus;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@AllArgsConstructor
public class SkillFieldRepository {
    private final ProceduceCall proceduceCall;

    public List<SkillFieldOut> getSkillFieldsWork(String workId) {
        var out_put = proceduceCall.callOneRefCursor("skill_field_work_search",
                List.of(ProcedureParameter.inputParam("in_work_id", String.class, workId),
                        ProcedureParameter.outputParam("out_result", String.class),
                        ProcedureParameter.refCursorParam("out_cur")), SkillFieldOut.class);
        String result = (String) out_put.get("out_result");
        if (!DataStatus.SUCCESS.equals(result)) {

        }
        return (List<SkillFieldOut>) out_put.get("out_cur");
    }
}
