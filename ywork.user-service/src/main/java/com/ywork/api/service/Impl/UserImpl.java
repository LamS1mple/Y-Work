package com.ywork.api.service.Impl;

import com.ywork.api.dto.in.UserIn;
import com.ywork.api.responsitory.UserResponsitory;
import com.ywork.api.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@AllArgsConstructor
public class UserImpl implements UserService {
    private final UserResponsitory userResponsitory;

    @Override
    public void createUser(UserIn userIn) {
        userResponsitory.insertUser(userIn);
    }
}
