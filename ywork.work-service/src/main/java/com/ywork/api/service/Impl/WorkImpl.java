package com.ywork.api.service.Impl;

import com.ywork.api.dto.in.KeyValue;
import com.ywork.api.dto.in.WorkCreateIn;
import com.ywork.api.dto.out.WorkOut;
import com.ywork.api.responsitory.LocationRepository;
import com.ywork.api.responsitory.SkillFieldRepository;
import com.ywork.api.responsitory.WorkRepository;
import com.ywork.api.service.WorkService;
import com.ywork.common.Common;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class WorkImpl implements WorkService {
    private final WorkRepository workRepository;
    private final LocationRepository locationRepository;
    private final SkillFieldRepository skillFieldRepository;
    private final MinioUtils minioUtils;
    @Override
    public List<WorkOut> getListWork() {
        List<WorkOut> workOutList = workRepository.getListWork();
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
