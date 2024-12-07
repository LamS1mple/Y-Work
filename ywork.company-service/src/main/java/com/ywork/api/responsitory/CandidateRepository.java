package com.ywork.api.responsitory;

import com.ywork.api.dto.in.CandidateIn;
import com.ywork.api.dto.out.CandidateApplyCompanyOut;
import com.ywork.api.dto.out.CandidateOut;
import com.ywork.api.responsitory.helper.ProceduceCall;
import com.ywork.api.responsitory.helper.ProcedureParameter;
import com.ywork.common.DataStatus.DataStatus;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@AllArgsConstructor
@Repository
public class CandidateRepository {
    private final ProceduceCall proceduceCall;

    public List<CandidateOut> getCandidate(String workId){
        var out_put = proceduceCall.callOneRefCursor("candidate_list",
                List.of(ProcedureParameter.inputParam("in_work_id", String.class, workId),
                        ProcedureParameter.refCursorParam("out_cur")), CandidateOut.class);
        return (List<CandidateOut>) out_put.get("out_cur");
    }

    public void changeStatus(CandidateIn candidateIn) {
        var out_put = proceduceCall.callNoRefCursor("candidate_change_status",
                List.of(ProcedureParameter.inputParam("in_candidate_id", String.class, candidateIn.getCandidateId()),
                        ProcedureParameter.inputParam("in_status", Integer.class, candidateIn.getStatus()),
                        ProcedureParameter.outputParam("out_result", String.class)));
        String result = (String) out_put.get("out_result");
        if (!DataStatus.SUCCESS.equals(result)){
            throw new RuntimeException("Fail change status candidate");
        }

    }

    public List<CandidateApplyCompanyOut> listApplyCompany(String companyId) {
        var out_put = proceduceCall.callOneRefCursor("candidate_list_apply_company",
                List.of(ProcedureParameter.inputParam("in_company_id", String.class, companyId),
                        ProcedureParameter.refCursorParam("out_cur")), CandidateApplyCompanyOut.class);
        return (List<CandidateApplyCompanyOut>) out_put.get("out_cur");
    }

    public void changeStatusAddRoleCandidateCompany(CandidateIn candidateIn) {
        var out_put = proceduceCall.callNoRefCursor("company_manager_status_role",
                List.of(ProcedureParameter.inputParam("in_company_manager_id", String.class, candidateIn.getCompanyManagerId()),
                        ProcedureParameter.inputParam("in_status", Integer.class, candidateIn.getStatus()),
                        ProcedureParameter.inputParam("in_role_id", String.class, candidateIn.getRoleId()),
                        ProcedureParameter.outputParam("out_result", String.class)
                )
        );
        String result = (String) out_put.get("out_result");
        if (!DataStatus.SUCCESS.equals(result)){
            throw new RuntimeException("Fail change status add role candidate");
        }
    }
}
