package com.ywork.common;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class JwtService {
    @Value(value = "${security.jwt.secret-key}")
    private String secrtKey;

    @Value("${security.jwt.expiration-time}")
    private long jwtExpiration;

}
