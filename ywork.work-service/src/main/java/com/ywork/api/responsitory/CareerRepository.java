package com.ywork.api.responsitory;

import com.ywork.api.dto.out.CareerOut;
import com.ywork.api.responsitory.helper.ProceduceCall;
import com.ywork.api.responsitory.helper.ProcedureParameter;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@AllArgsConstructor
public class CareerRepository {
    private final ProceduceCall proceduceCall;
    public List<CareerOut> getListCareer(){
        var out_put = proceduceCall.callOneRefCursor("career_list",
                List.of(ProcedureParameter.refCursorParam("out_cur")), CareerOut.class);
        return (List<CareerOut>) out_put.get("out_cur");
    }

    public List<CareerOut> getListCareer(String careerId){
        var out_put = proceduceCall.callOneRefCursor("career_list",
                List.of(ProcedureParameter.inputParam("in_career_id", String.class, careerId),
                        ProcedureParameter.refCursorParam("out_cur")), CareerOut.class);
        return (List<CareerOut>) out_put.get("out_cur");
    }
}
