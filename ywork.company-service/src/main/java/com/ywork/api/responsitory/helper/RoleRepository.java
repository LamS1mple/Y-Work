package com.ywork.api.responsitory.helper;

import com.ywork.api.dto.out.RoleOut;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@AllArgsConstructor
@Repository
public class RoleRepository {
    private final ProceduceCall proceduceCall;
    public List<RoleOut> getRole(String checkRole, String userId){
        var out_put = proceduceCall.callOneRefCursor("check_role",
                List.of(
                        ProcedureParameter.inputParam("in_check_role", String.class, checkRole),
                        ProcedureParameter.inputParam("in_user_id", String.class, userId),
                        ProcedureParameter.refCursorParam("out_cur")
                ), RoleOut.class);
        return (List<RoleOut>) out_put.get("out_cur");
    }
}
