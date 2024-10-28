package com.ywork.api.service.Impl;

import com.ywork.api.dto.in.UserIn;
import com.ywork.api.dto.out.UserOut;
import com.ywork.api.responsitory.UserResponsitory;
import com.ywork.api.service.UserService;
import com.ywork.security.JwtManager;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
@AllArgsConstructor
public class UserImpl implements UserService {
    private final UserResponsitory userResponsitory;
    private final JwtManager jwtManager;

    @Override
    public void createUser(UserIn userIn) {
        userResponsitory.insertUser(userIn);
    }

    @Override
    public Map<String, Object> getUser(UserIn userIn) {
        UserOut userOut = userResponsitory.loadUserByUsername(userIn.getUsername());
        if (userOut != null && userIn.getPassword().equals(userOut.getPassword())) {
            String token = jwtManager.generateToken(userOut);
            return Map.of("token", token);
        }
        return null;
    }


}
