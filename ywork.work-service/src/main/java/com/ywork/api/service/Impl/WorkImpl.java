package com.ywork.api.service.Impl;

import com.ywork.api.dto.out.WorkOut;
import com.ywork.api.responsitory.LocationRepository;
import com.ywork.api.responsitory.SkillFieldRepository;
import com.ywork.api.responsitory.WorkRepository;
import com.ywork.api.service.WorkService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class WorkImpl implements WorkService {
    private final WorkRepository workRepository;
    private final LocationRepository locationRepository;
    private final SkillFieldRepository skillFieldRepository;
    @Override
    public List<WorkOut> getListWork() {
        List<WorkOut> workOutList = workRepository.getListWork();
        for (WorkOut workOut : workOutList) {
            workOut.setLocations(locationRepository.getLocationsWork(workOut.getWorkId()));
            workOut.setSkills(skillFieldRepository.getSkillFieldsWork(workOut.getWorkId()));
        }
        return workOutList;
    }
}
