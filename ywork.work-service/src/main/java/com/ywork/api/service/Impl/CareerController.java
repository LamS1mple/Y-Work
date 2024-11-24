package com.ywork.api.service.Impl;

import com.ywork.api.dto.out.CareerOut;
import com.ywork.api.responsitory.CareerRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@AllArgsConstructor
public class CareerController implements CareerService{
    private final CareerRepository careerRepository;
    @Override
    public List<CareerOut> getListCareer() {
        return careerRepository.getListCareer();
    }

    @Override
    public List<CareerOut> getSkill(String careerId) {
        return careerRepository.getListCareer(careerId);
    }
}
