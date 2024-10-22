package com.ywork.api.responsitory;

import com.ywork.api.dto.in.UserIn;
import com.ywork.api.responsitory.helper.ProceduceCall;
import com.ywork.api.responsitory.helper.ProcedureParameter;
import com.ywork.common.DataStatus.DataStatus;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@AllArgsConstructor
public class UserResponsitory {
    private final ProceduceCall proceduceCall;

    public void insertUser(UserIn userIn){
        var out = proceduceCall.callNoRefCursor("user_create",
                List.of(ProcedureParameter.inputParam("in_username", String.class, userIn.getUsername()),
                        ProcedureParameter.inputParam("in_email", String.class, userIn.getEmail()),
                        ProcedureParameter.inputParam("in_phone_number", String.class, userIn.getPhoneNumber()),
                        ProcedureParameter.inputParam("in_password", String.class, userIn.getPassword()),
                        ProcedureParameter.inputParam("in_name_account", String.class, userIn.getName_account()),
                        ProcedureParameter.outputParam("out_result", String.class)));
        String outResult = (String) out.get("out_result");
        if (!DataStatus.SUCCESS.equals(outResult)){
            return ;
        }

    }
}
