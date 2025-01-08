package com.ywork.api.responsitory;

import com.ywork.api.dto.in.WorkCreateIn;
import com.ywork.api.dto.out.WorkOut;
import com.ywork.api.responsitory.helper.ProceduceCall;
import com.ywork.api.responsitory.helper.ProcedureParameter;
import com.ywork.common.Common;
import com.ywork.common.DataStatus.DataStatus;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
@AllArgsConstructor
public class WorkRepository {
    private final ProceduceCall proceduceCall;
    public List<WorkOut> getListWork(){
        var out_put = proceduceCall.callOneRefCursor("work_list_search",
                List.of(ProcedureParameter.outputParam("out_result", String.class),
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

    public void createJob(WorkCreateIn workCreateIn) {

        var out_put = proceduceCall.callNoRefCursor("work_create",
                List.of(ProcedureParameter.inputParam("in_name_work", String.class, workCreateIn.getJobTitle()),
                        ProcedureParameter.inputParam("in_due_date", Date.class, workCreateIn.getExpirationDate()),
                        ProcedureParameter.inputParam("in_quantity", String.class, workCreateIn.getRecruitmentNumber()),
                        ProcedureParameter.inputParam("in_benefits", String.class, workCreateIn.getCandidateBenefits()),
                        ProcedureParameter.inputParam("in_requirements", String.class, workCreateIn.getCandidateRequirements()),
                        ProcedureParameter.inputParam("in_work_location", String.class, workCreateIn.getWorkLocation()),
                        ProcedureParameter.inputParam("in_salary_min", Long.class, workCreateIn.getSalaryMin()),
                        ProcedureParameter.inputParam("in_salary_max", Long.class, workCreateIn.getSalaryMax()),
                        ProcedureParameter.inputParam("in_company_id", String.class, workCreateIn.getCompanyId()),
                        ProcedureParameter.inputParam("in_skill_id", String.class, Common.subString(workCreateIn.getSubIndustry())),
                        ProcedureParameter.inputParam("in_format_work", String.class, workCreateIn.getJobType().getLabel()),
                        ProcedureParameter.inputParam("in_experience", String.class, workCreateIn.getExperience().getLabel()),
                        ProcedureParameter.inputParam("in_sex", String.class, workCreateIn.getGender().getLabel()),
                        ProcedureParameter.inputParam("in_location", String.class, Common.subString(workCreateIn.getAreas())),
                        ProcedureParameter.inputParam("in_position", String.class, workCreateIn.getJobPosition()),
                        ProcedureParameter.inputParam("in_description", String.class, workCreateIn.getJobDescription()),
                        ProcedureParameter.outputParam("out_result", String.class)));
        String result = (String) out_put.get("out_result");
        if (!DataStatus.SUCCESS.equals(result)) {}

    }

    public void changeStatusWork(String workId) {
        var out_put = proceduceCall.callNoRefCursor("work_change_status",
                List.of(ProcedureParameter.inputParam("in_work_id", String.class, workId),
                        ProcedureParameter.outputParam("out_result", String.class)));
        String result = (String) out_put.get("out_result");
        if (!DataStatus.SUCCESS.equals(result)) {
            throw new RuntimeException("Fail work status");
        }
    }

    public List<WorkOut> getListWorkRecommend(String resultRecommend) {
        var out_put = proceduceCall.callOneRefCursor("work_recommend",
                List.of(ProcedureParameter.inputParam("in_data", String.class, resultRecommend),
                        ProcedureParameter.refCursorParam("out_cur")), WorkOut.class);
        return (List<WorkOut>) out_put.get("out_cur");
    }

    public List<WorkOut> getListSearchWorkRecommend(String resultRecommend) {
        var out_put = proceduceCall.callOneRefCursor("work_search_recommend",
                List.of(ProcedureParameter.inputParam("in_data", String.class, resultRecommend),
                        ProcedureParameter.refCursorParam("out_cur")), WorkOut.class);
        return (List<WorkOut>) out_put.get("out_cur");
    }

    public List<WorkOut> getListWorkCompany(String companyId) {
        var out_put = proceduceCall.callOneRefCursor("work_company_public",
                List.of(ProcedureParameter.inputParam("in_company_id", String.class, companyId),
                        ProcedureParameter.outputParam("out_result", String.class),
                        ProcedureParameter.refCursorParam("out_cur")), WorkOut.class);
        String result = (String) out_put.get("out_result");
        if (!DataStatus.SUCCESS.equals(result)) {

        }
        return (List<WorkOut>) out_put.get("out_cur");
    }

    public void deleteJob(String workId) {
        var out_put = proceduceCall.callNoRefCursor("work_delete",
                List.of(ProcedureParameter.inputParam("in_work_id", String.class, workId),
                        ProcedureParameter.outputParam("out_result", String.class)));
        String result = (String) out_put.get("out_result");
        if (!DataStatus.SUCCESS.equals(result)) {
            throw new RuntimeException("Fail work delete");
        }
    }
}
