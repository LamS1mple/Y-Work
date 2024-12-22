package com.ywork.api.service.Impl;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.ywork.api.model.EntityRequest;
import com.ywork.api.service.ApiCall;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Enumeration;
import java.util.List;
import java.util.Objects;

@Service
public class ApiCallImpl implements ApiCall {
    @Value( "${api-call.user-service}")
    private String HOST_USER;
    @Value( "${api-call.ai-service}")
    private String HOST_AI;
    private final RestTemplate restTemplate;
    private final Gson gson;

    public ApiCallImpl(Gson gson, RestTemplate restTemplate) {
        this.gson = gson;
        this.restTemplate = restTemplate;
    }


    @Override
    public JsonElement recommend() {
        EntityRequest entityRequest = EntityRequest.builder()
                .uri(UriComponentsBuilder.fromHttpUrl(HOST_USER + recommendCV).build().toUri())
                .httpMethod(HttpMethod.GET)
                .build();
        String result = restAPI(entityRequest);
        return gson.fromJson(result, JsonElement.class);
    }

    @Override
    public String getIdWorkRecommend(List<String> list) {
        EntityRequest entityRequest = EntityRequest.builder()
                .uri(UriComponentsBuilder.fromHttpUrl(HOST_AI + recommendWork).build().toUri())
                .object(list)
                .httpMethod(HttpMethod.POST)
                .build();
        return restAPI(entityRequest);

    }

    private String restAPI(EntityRequest entityRequest){
        HttpServletRequest request = ((ServletRequestAttributes) Objects.requireNonNull(RequestContextHolder.getRequestAttributes())).getRequest();
        Enumeration<String> headerNames = request.getHeaderNames();
        HttpHeaders headers = new HttpHeaders();
        while (headerNames.hasMoreElements()) {
            String headerName = headerNames.nextElement();
            headers.add(headerName, request.getHeader(headerName));
        }
        if (entityRequest.getHttpMethod().equals(HttpMethod.GET)) {
            ResponseEntity<String> response =  restTemplate.exchange(entityRequest.getUri(), entityRequest.getHttpMethod(), new HttpEntity<>(headers), String.class);
            return response.getBody();
        }
        ResponseEntity<String> response =  restTemplate.exchange(entityRequest.getUri(), entityRequest.getHttpMethod(),
                new HttpEntity<>(entityRequest.getObject(), headers), String.class);
        return response.getBody();

    }
}
