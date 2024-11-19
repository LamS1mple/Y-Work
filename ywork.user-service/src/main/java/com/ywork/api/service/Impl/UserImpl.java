package com.ywork.api.service.Impl;

import com.ywork.api.dto.in.UserIn;
import com.ywork.api.dto.out.UserOut;
import com.ywork.api.model.User;
import com.ywork.api.responsitory.UserResponsitory;
import com.ywork.api.service.UserService;
import com.ywork.config.MinioConfig;
import com.ywork.security.JwtManager;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
@AllArgsConstructor
public class UserImpl implements UserService {
    private final UserResponsitory userResponsitory;
    private final JwtManager jwtManager;
    private final MinioUtils minioUtils;
    @Override
    public void createUser(UserIn userIn) {
        userResponsitory.insertUser(userIn);
    }

    @Override
    public Map<String, Object> getUser(UserIn userIn) {
        User userOut = userResponsitory.loadUserByUsername(userIn.getUsername());
        if (userOut != null && userIn.getPassword().equals(userOut.getPassword())) {
            String token = jwtManager.generateToken(userOut);
            return Map.of("token", token);
        }
        return null;
    }

    @Override
    public Object getDetailUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User userDetails = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        UserOut userOut = userResponsitory.detailUser(userDetails.getUserId());
        userOut.setUrlAvatar(minioUtils.getUrlFile(MinioConfig.bucket, userOut.getAvatar()));
        return userOut;
    }


}
