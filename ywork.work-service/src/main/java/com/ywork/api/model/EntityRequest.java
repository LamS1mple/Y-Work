package com.ywork.api.model;

import lombok.Builder;
import lombok.Data;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;

import java.net.URI;

@Builder
@Data
public class EntityRequest {
    private URI uri;
    private HttpMethod httpMethod;
    private Object object;
}
