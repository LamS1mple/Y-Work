package com.ywork.api.service.Impl;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.ywork.api.dto.in.KeyValue;
import com.ywork.api.dto.in.WorkCreateIn;
import com.ywork.api.dto.out.WorkOut;
import com.ywork.api.responsitory.LocationRepository;
import com.ywork.api.responsitory.SkillFieldRepository;
import com.ywork.api.responsitory.WorkRepository;
import com.ywork.api.service.ApiCall;
import com.ywork.api.service.WorkService;
import com.ywork.common.Common;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class WorkImpl implements WorkService {
    private final WorkRepository workRepository;
    private final LocationRepository locationRepository;
    private final SkillFieldRepository skillFieldRepository;
    private final MinioUtils minioUtils;
    private final ApiCall apiCall;
    private final Gson gson;
    @Override
    public List<WorkOut> getListWork() {
        List<WorkOut> workOutList = null;
        try{
            JsonElement jsonElement = apiCall.recommend();
            JsonObject jsonObject = jsonElement.getAsJsonObject();
            List<String> list = gson.fromJson(jsonObject.get("object").getAsJsonArray(), List.class);
            if (list == null || list.isEmpty()) throw new RuntimeException();
            String resultRecommend = apiCall.getIdWorkRecommend(list);
             workOutList = workRepository.getListWorkRecommend(resultRecommend);
        } catch (Exception e) {
//            log.error(e.getMessage().substring(0, 100));
            workOutList = workRepository.getListWork();
        }
        for (WorkOut workOut : workOutList) {
            workOut.setLocations(locationRepository.getLocationsWork(workOut.getLocation()));
            workOut.setSkills(skillFieldRepository.getSkillFieldsWork(workOut.getWorkId()));
            workOut.setUrlAvatar(minioUtils.getUrlFile(workOut.getCompanyId(), workOut.getAvatar()));
            if (workOut.getSalaryMax() != 0 || workOut.getSalaryMin() != 0) {
                workOut.setTypeSalary(1);
            }
            workOut.setConvertSalary(Common.convertMoney(workOut.getSalaryMin(), workOut.getSalaryMax()));
        }
        return workOutList;
    }

    @Override
    public Object getDetail(String workId) {
        WorkOut workOut = workRepository.getDetailWork(workId);
        workOut.setLocations(locationRepository.getLocationsWork(workOut.getLocation()));
        workOut.setSkills(skillFieldRepository.getSkillFieldsWork(workOut.getWorkId()));
//        workOut.setUrlAvatar(minioUtils.getUrlFile(workOut.getCompanyId(), workOut.getAvatar()));
        workOut.setConvertSalary(Common.convertMoney(workOut.getSalaryMin(), workOut.getSalaryMax()));
        return workOut;
    }



    @Override
    public void createWork(WorkCreateIn workCreateIn) {
        workRepository.createJob(workCreateIn);
    }

    @Override
    public void changeStatus(String workId) {
        workRepository.changeStatusWork(workId);
    }
}
