package com.ywork.api.responsitory;

import com.ywork.api.dto.in.UserIn;
import com.ywork.api.dto.out.RoleOut;
import com.ywork.api.dto.out.UserOut;
import com.ywork.api.model.User;
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
    public User loadUserByUsername(String username) {
        var out = proceduceCall.callMultiRefCursor("user_select",
                List.of(ProcedureParameter.inputParam("in_username", String.class, username),
                        ProcedureParameter.outputParam("out_result", String.class),
                        ProcedureParameter.refCursorParam("out_cur"),
                        ProcedureParameter.refCursorParam("out_cur_role")),

                        Map.of("out_cur", User.class,
                                "out_cur_role", RoleOut.class));

        String outResult = (String) out.get("out_result");
        if (!DataStatus.SUCCESS.equals(outResult)){return null;}
        User userOut = ((List<User>) out.get("out_cur")).get(0);
        userOut.setRoles((List<RoleOut>) out.get("out_cur_role"));
        return userOut;

    }


    public UserOut detailUser(String userId) {
        var out = proceduceCall.callOneRefCursor("user_detail",
                List.of(ProcedureParameter.inputParam("in_user_id", String.class, userId),
                        ProcedureParameter.outputParam("out_result", String.class),
                        ProcedureParameter.refCursorParam("out_cur")), UserOut.class);
        String result = (String) out.get("out_result");
        if (!DataStatus.SUCCESS.equals(result)){throw new RuntimeException("Not found");}
        List<UserOut> userOutList = (List<UserOut>) out.get("out_cur");
        if (userOutList.isEmpty()) throw new RuntimeException("Not found");
        return userOutList.get(0);
    }
}
