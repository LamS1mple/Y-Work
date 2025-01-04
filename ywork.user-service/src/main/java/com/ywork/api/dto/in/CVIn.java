package com.ywork.api.dto.in;

import lombok.Data;

import java.util.Map;
@Data
public class CVIn {
    private Integer typeCV;
    private String name;
    private String title;
    private Map<String, String> contact;
    private String profile;
    private String profileText;
    private Object skills;
    private Object education;
    private Object experience;
    private Object languages;
    private String photo;
    private Object certificates;

    private Integer status;
    private String cvId;
}
