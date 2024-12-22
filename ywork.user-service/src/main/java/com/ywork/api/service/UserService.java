package com.ywork.api.service;

import com.ywork.api.dto.in.CVIn;
import com.ywork.api.dto.in.UserIn;
import com.ywork.api.dto.out.CVOut;

import java.util.List;
import java.util.Map;

public interface UserService {
    void createUser(UserIn userIn);

    Map<String, Object> getUser(UserIn userIn);

    Object getDetailUser();

    Map<String, Object> loginCompany(UserIn userIn);

    void saveCV(CVIn cv);

    List<CVOut> listCV();

    List<String> getCVRecommend();

    CVOut getCV(String cvId);

    void changeStatus(CVIn cv);
}
