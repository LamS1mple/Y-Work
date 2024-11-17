package com.ywork.api.service;

import com.ywork.api.dto.out.WorkOut;

import java.util.List;

public interface WorkService {
    List<WorkOut> getListWork();

    Object getDetail(String workId);
}
