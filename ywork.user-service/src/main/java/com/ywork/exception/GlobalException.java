package com.ywork.exception;

import com.thoughtworks.xstream.security.ForbiddenClassException;
import com.ywork.api.dto.ApiResult;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class GlobalException {
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResult> exception(Exception e) {
        String message = e.getMessage();
        ApiResult apiResult = new ApiResult();
        apiResult.setObject(Map.of("message", message));
        apiResult.setMessages("ex");
        return  new ResponseEntity<>(apiResult, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @ExceptionHandler(ExpiredJwtException.class)
    public ResponseEntity<ApiResult> handleExpiredJwtException(ExpiredJwtException e) {
        String message = e.getMessage();

        ApiResult apiResult = new ApiResult();
        apiResult.setObject(Map.of("message", message)); // You can customize the map here
        apiResult.setMessages("JWT token has expired, please log in again.");  // Customize the response message

        return new ResponseEntity<>(apiResult, HttpStatus.UNAUTHORIZED); // Or HttpS tatus.FORBIDDEN if you prefer
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ApiResult> handleAccessDeniedException(AccessDeniedException e) {
        ApiResult apiResult = new ApiResult();
        apiResult.setObject(Map.of("message", e.getMessage()));
        apiResult.setMessages("Access Denied");
        return new ResponseEntity<>(apiResult, HttpStatus.FORBIDDEN);
    }
}
