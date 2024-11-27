package com.ywork.api.service.Impl;

import com.ywork.api.dto.in.KeyValue;
import com.ywork.api.dto.in.WorkCreateIn;
import com.ywork.api.dto.out.WorkOut;
import com.ywork.api.responsitory.LocationRepository;
import com.ywork.api.responsitory.SkillFieldRepository;
import com.ywork.api.responsitory.WorkRepository;
import com.ywork.api.service.WorkService;
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
            workOut.setConvertSalary(convertMoney(workOut.getSalaryMin(), workOut.getSalaryMax()));
        }
        return workOutList;
    }

    @Override
    public Object getDetail(String workId) {
        WorkOut workOut = workRepository.getDetailWork(workId);
        workOut.setLocations(locationRepository.getLocationsWork(workOut.getLocation()));
        workOut.setSkills(skillFieldRepository.getSkillFieldsWork(workOut.getWorkId()));
//        workOut.setUrlAvatar(minioUtils.getUrlFile(workOut.getCompanyId(), workOut.getAvatar()));
        workOut.setConvertSalary(convertMoney(workOut.getSalaryMin(), workOut.getSalaryMax()));
        return workOut;
    }

    private String convertMoney(long min, long max){
        if (min == 0 && max == 0) {return "Thỏa thuận";}
        String s =  "%.1f triệu".formatted((float) min / 1_000_000);
        if (max > 0){
            s += " - %.1f triệu".formatted((float) max / 1_000_000);
        }
        return s;
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
