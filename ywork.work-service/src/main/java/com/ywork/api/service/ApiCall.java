package com.ywork.api.service;

import com.google.gson.JsonElement;

import java.util.List;

public interface ApiCall {
    String recommendCV = "/user/cv-recommend";
    String recommendWork = "/recommend";
    String searchWork = "/search";
    JsonElement recommend();
    String searchAI(String keyword);
    String getIdWorkRecommend(List<String> list);
}
