package com.ywork.exception;

import com.thoughtworks.xstream.security.ForbiddenClassException;
import com.ywork.api.dto.ApiResult;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class GlobalException {
    @ExceptionHandler(ForbiddenClassException.class)
    public ResponseEntity<ApiResult> forbiddenClassException(ForbiddenClassException e) {
        String message = e.getMessage();
        ApiResult apiResult = new ApiResult();
        apiResult.setObject(Map.of("message", message));
        apiResult.setMessages("forbidden");
        return  new ResponseEntity<>(apiResult, HttpStatus.FORBIDDEN);
    }
}
