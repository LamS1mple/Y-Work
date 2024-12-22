package com.ywork.api.service;

import com.google.gson.JsonElement;

import java.util.List;

public interface ApiCall {
    String recommendCV = "/user/cv-recommend";
    String recommendWork = "/recommend";
    JsonElement recommend();

    String getIdWorkRecommend(List<String> list);
}
