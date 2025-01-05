package com.ywork.api.service.Impl;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.ywork.api.dto.in.CVIn;
import com.ywork.api.dto.in.UserIn;
import com.ywork.api.dto.in.UserUpdate;
import com.ywork.api.dto.out.CVOut;
import com.ywork.api.dto.out.UserOut;
import com.ywork.api.model.MultipartFileConvert;
import com.ywork.api.model.User;
import com.ywork.api.responsitory.UserResponsitory;
import com.ywork.api.service.UserService;
import com.ywork.config.MinioConfig;
import com.ywork.security.JwtManager;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.Base64;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@AllArgsConstructor
public class UserImpl implements UserService {
    private final UserResponsitory userResponsitory;
    private final JwtManager jwtManager;
    private final MinioUtils minioUtils;
    private final Gson gson;
    @Override
    public void createUser(UserIn userIn) {
        userResponsitory.insertUser(userIn);
    }

    @Override
    public Map<String, Object> getUser(UserIn userIn) {
        User userOut = userResponsitory.loadUserByUsername(userIn.getUsername());
        if (userOut.getRoles().stream().noneMatch(roleOut -> roleOut.getName().equals("user"))){
            throw new RuntimeException("Fail login");
        }
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



    @Override
    public Map<String, Object> loginCompany(UserIn userIn) {
        User userOut = userResponsitory.loadUserByUsername(userIn.getUsername());
        if (userOut.getRoles().stream().noneMatch(roleOut -> roleOut.getName().equals("owner"))){
            throw new RuntimeException("Faile login company");
        }
        if (!userIn.getPassword().equals(userOut.getPassword())) {
            throw new RuntimeException("Faile login company");
        }
        String token = jwtManager.generateToken(userOut);
        return Map.of("token", token);
    }

    @Override
    public void saveCV(CVIn cv) {
        User userOut = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String photoData = cv.getPhoto();
        cv.setPhoto(null);
        String cvId = userResponsitory.saveCV(cv, userOut.getUserId());

        if (cv.getTypeCV() == 2 && photoData!= null && !photoData.isEmpty()) {
            if (!photoData.contains("image/jpeg")) throw new RuntimeException("File không hợp lệ");
            byte[] photo = Base64.getDecoder().decode(photoData.split(",")[1]);
            MultipartFileConvert multipartFileConvert = new MultipartFileConvert(photo, "image/jpeg");
            minioUtils.uploadFile("user", cvId +".jpg", multipartFileConvert);
        }
    }

    @Override
    public List<CVOut> listCV() {
        User userOut = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<CVOut> list = userResponsitory.listCV(userOut.getUserId());
        return list;
    }

    @Override
    public List<String> getCVRecommend() {
        User userOut = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<String> list = userResponsitory.getCVRecommend(userOut.getUserId()).stream().map(cvOut -> {
            JsonObject jsonObject = gson.fromJson(cvOut.getInfo(), JsonObject.class);
            return jsonObject.get("title").getAsString();
        }).toList();
        return list;
    }

    @Override
    public CVOut getCV(String cvId) {
        CVOut cvOut = userResponsitory.getCVDetail(cvId);
        JsonObject jsonObject = gson.fromJson(cvOut.getInfo(), JsonObject.class);
        if (jsonObject.get("typeCV").getAsInt() == 2){
            try {
                String urlPhoto = minioUtils.getUrlFile("user", cvOut.getCvId() + ".jpg");
                jsonObject.addProperty("photo",urlPhoto);
                cvOut.setInfo(gson.toJson(jsonObject));
            } catch (Exception e) {
                log.error("Not found photo");
            }

        }
        return cvOut;
    }

    @Override
    public void changeStatus(CVIn cv) {
        userResponsitory.changeStatusCV(cv);
    }

    @Override
    public void changeCV(CVIn cv) {
        String photoData = cv.getPhoto();
        cv.setPhoto(null);
        userResponsitory.changeCV1(cv);
        if (cv.getTypeCV() == 2 && photoData!= null && !photoData.isEmpty()) {
            if (photoData.contains("image/jpeg")) {
                byte[] photo = Base64.getDecoder().decode(photoData.split(",")[1]);
                MultipartFileConvert multipartFileConvert = new MultipartFileConvert(photo, "image/jpeg");
                minioUtils.uploadFile("user", cv.getCvId() + ".jpg", multipartFileConvert);
            }
        }
    }

    @Override
    public void updateUser(UserUpdate user) {
        User userOut = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String avatar = userOut.getUserId() + ".jpg";
        user.setAvatar(avatar);
        if (user.getFile() != null){
            minioUtils.uploadFile("user", avatar, user.getFile());
        }
        userResponsitory.updateUser(user, userOut.getUserId());
    }

    @Override
    public void cvDelete(String cvId) {
        userResponsitory.cvDelete(cvId);
    }


}
