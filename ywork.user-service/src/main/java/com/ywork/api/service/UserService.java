package com.ywork.api.service;

import com.ywork.api.dto.in.RegisterAccount;
import com.ywork.api.dto.in.UserIn;
import com.ywork.api.dto.out.UserOut;

import java.util.Map;

public interface UserService {
    void createUser(UserIn userIn);

    Map<String, Object> getUser(UserIn userIn);

    Object getDetailUser();

    Map<String, Object> loginCompany(UserIn userIn);
}
