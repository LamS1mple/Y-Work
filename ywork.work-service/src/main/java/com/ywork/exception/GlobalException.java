package com.ywork.exception;

import com.thoughtworks.xstream.security.ForbiddenClassException;
import com.ywork.api.dto.ApiResult;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;
@Slf4j
@RestControllerAdvice
public class GlobalException {
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResult> exception(Exception e) {
        log.error(e.getMessage(), e);
        String message = e.getMessage();
        ApiResult apiResult = new ApiResult();
        apiResult.setObject(Map.of("message", message));
        apiResult.setMessages("ex");
        return  new ResponseEntity<>(apiResult, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
