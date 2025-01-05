package com.ywork.api.responsitory;

import com.google.gson.Gson;
import com.ywork.api.dto.in.CVIn;
import com.ywork.api.dto.in.UserIn;
import com.ywork.api.dto.in.UserUpdate;
import com.ywork.api.dto.out.CVOut;
import com.ywork.api.dto.out.RoleOut;
import com.ywork.api.dto.out.UserOut;
import com.ywork.api.model.User;
import com.ywork.api.responsitory.helper.ProceduceCall;
import com.ywork.api.responsitory.helper.ProcedureParameter;
import com.ywork.common.DataStatus.DataStatus;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
@AllArgsConstructor
public class UserResponsitory  implements UserDetailsService{

    private final ProceduceCall proceduceCall;
    private final Gson gson;

    public void insertUser(UserIn userIn){
        var out = proceduceCall.callNoRefCursor("user_created",
                List.of(ProcedureParameter.inputParam("in_username", String.class, userIn.getUsername()),
                        ProcedureParameter.inputParam("in_email", String.class, userIn.getEmail()),
                        ProcedureParameter.inputParam("in_phone_number", String.class, userIn.getPhone()),
                        ProcedureParameter.inputParam("in_password", String.class, userIn.getPassword()),
                        ProcedureParameter.inputParam("in_name_account", String.class, userIn.getFullName()),
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
        List<RoleOut> roleOuts = (List<RoleOut>) out.get("out_cur_role");
        userOut.setRoles(roleOuts);
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

    public String saveCV(CVIn cv, String userId) {
        String json = gson.toJson(cv);
        var out = proceduceCall.callNoRefCursor("resume_save",
                List.of(ProcedureParameter.inputParam("in_info", String.class, json),
                        ProcedureParameter.inputParam("in_user_id",String.class, userId),
                        ProcedureParameter.outputParam("out_result", String.class),
                        ProcedureParameter.outputParam("out_cv_id", String.class)));
        String outResult = (String) out.get("out_result");
        if (!DataStatus.SUCCESS.equals(outResult)){throw new RuntimeException("Fail save cv");}
        return (String) out.get("out_cv_id");
    }

    public List<CVOut> listCV(String userId) {
        var out = proceduceCall.callOneRefCursor("resume_list",
                List.of(ProcedureParameter.inputParam("in_user_id",String.class, userId),
                        ProcedureParameter.refCursorParam("out_cur")
                ), CVOut.class
        );
        return (List<CVOut>) out.get("out_cur");
    }

    public List<CVOut> getCVRecommend(String userId) {
        var out = proceduceCall.callOneRefCursor("cv_recommend",
                List.of(ProcedureParameter.inputParam("in_user_id",String.class, userId),
                        ProcedureParameter.refCursorParam("out_cur")
                ), CVOut.class
        );
        return (List<CVOut>) out.get("out_cur");
    }

    public CVOut getCVDetail(String cvId) {
        var out = proceduceCall.callOneRefCursor("resume_detail",
                List.of(ProcedureParameter.inputParam("in_cv_id",String.class, cvId),
                        ProcedureParameter.refCursorParam("out_cur")
                ), CVOut.class
        );
        return ((List<CVOut>) out.get("out_cur")).get(0);
    }

    public void changeStatusCV(CVIn cv) {
        var out = proceduceCall.callNoRefCursor("resume_change_status",
                List.of(ProcedureParameter.inputParam("in_cv_id", String.class, cv.getCvId()),
                        ProcedureParameter.inputParam("in_status",Integer.class, cv.getStatus()),
                        ProcedureParameter.outputParam("out_result", String.class))
        );
        String result = (String) out.get("out_result");
        if (!DataStatus.SUCCESS.equals(result)) throw new RuntimeException("Fail change status CV");
    }

    public void changeCV1(CVIn cv) {
        String json = gson.toJson(cv);
        var out = proceduceCall.callNoRefCursor("resume_change",
                List.of(ProcedureParameter.inputParam("in_info", String.class, json),
                        ProcedureParameter.inputParam("in_cv_id",String.class, cv.getCvId()),
                        ProcedureParameter.outputParam("out_result", String.class)));
        String outResult = (String) out.get("out_result");
        if (!DataStatus.SUCCESS.equals(outResult)){throw new RuntimeException("Fail change cv");}
    }

    public void updateUser(UserUpdate user, String userId) {
        var out = proceduceCall.callNoRefCursor("user_update",
                List.of(ProcedureParameter.inputParam("in_user_id", String.class, userId),
                        ProcedureParameter.inputParam("in_email",String.class, user.getEmail()),
                        ProcedureParameter.inputParam("in_name_account", String.class, user.getFullName()),
                        ProcedureParameter.inputParam("in_phone_number", String.class, user.getPhone()),
                        ProcedureParameter.inputParam("in_avatar", String.class, user.getAvatar())));
    }

    public void cvDelete(String cvId) {
        var out = proceduceCall.callNoRefCursor("resume_delete",
                List.of(ProcedureParameter.inputParam("in_cv_id", String.class, cvId),
                        ProcedureParameter.outputParam("out_result", String.class))
        );
        String outResult = (String) out.get("out_result");
        if (!DataStatus.SUCCESS.equals(outResult)){throw new RuntimeException("Fail delete cv");}
    }
}
