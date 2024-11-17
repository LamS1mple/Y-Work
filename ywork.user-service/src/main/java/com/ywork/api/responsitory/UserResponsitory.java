package com.ywork.api.responsitory;

import com.ywork.api.dto.in.UserIn;
import com.ywork.api.dto.out.RoleOut;
import com.ywork.api.dto.out.UserOut;
import com.ywork.api.responsitory.helper.ProceduceCall;
import com.ywork.api.responsitory.helper.ProcedureParameter;
import com.ywork.common.DataStatus.DataStatus;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
@AllArgsConstructor
public class UserResponsitory  implements UserDetailsService{

    private final ProceduceCall proceduceCall;

    public void insertUser(UserIn userIn){
        var out = proceduceCall.callNoRefCursor("user_created",
                List.of(ProcedureParameter.inputParam("in_username", String.class, userIn.getUsername()),
                        ProcedureParameter.inputParam("in_email", String.class, userIn.getEmail()),
                        ProcedureParameter.inputParam("in_phone_number", String.class, userIn.getPhoneNumber()),
                        ProcedureParameter.inputParam("in_password", String.class, userIn.getPassword()),
                        ProcedureParameter.inputParam("in_name_account", String.class, userIn.getNameAccount()),
                        ProcedureParameter.inputParam("in_role_status", Integer.class, userIn.getRoleStatus()),
                        ProcedureParameter.outputParam("out_result", String.class)));
        String outResult = (String) out.get("out_result");
        if (!DataStatus.SUCCESS.equals(outResult)){
            return ;
        }

    }
    @Override
    public UserOut loadUserByUsername(String username) {
        var out = proceduceCall.callMultiRefCursor("user_select",
                List.of(ProcedureParameter.inputParam("in_username", String.class, username),
                        ProcedureParameter.outputParam("out_result", String.class),
                        ProcedureParameter.refCursorParam("out_cur"),
                        ProcedureParameter.refCursorParam("out_cur_role")),

                        Map.of("out_cur", UserOut.class,
                                "out_cur_role", RoleOut.class));

        String outResult = (String) out.get("out_result");
        if (!DataStatus.SUCCESS.equals(outResult)){return null;}
        UserOut userOut = ((List<UserOut>) out.get("out_cur")).get(0);
        userOut.setRoles((List<RoleOut>) out.get("out_cur_role"));
        return userOut;

    }



}
