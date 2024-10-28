package com.ywork.security;

import com.ywork.api.dto.out.UserOut;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.xml.crypto.Data;
import java.security.Key;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtManager {

    @Value("${security.jwt.secret-key}")
    private  String jwtSecret;
    private final long TOKEN_VALIDITY= 24 * 60 * 60 * 1000;
    public String generateToken(UserOut userOut) {
        Map<String, Object> claims = Map.of("id", userOut.getUserId());
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userOut.getUsername())
                .setIssuedAt( new Date() )
                .setExpiration(new Date(System.currentTimeMillis() + TOKEN_VALIDITY ))
                .signWith(getKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public Boolean validateJwtToken(String token){
        Claims claims = (Claims) Jwts.parserBuilder()
                .setSigningKey(getKey())
                .build()
                .parse(token).getBody();
        return claims.getExpiration().after(new Date());
    }

    public String  getUsername(String token){
        Claims claims = (Claims) Jwts.parserBuilder()
                .setSigningKey(getKey())
                .build()
                .parse(token).getBody();
        String username = claims.getSubject();
        return username;
    }

    private Key getKey(){
        byte[] keyBytes = Decoders.BASE64.decode(jwtSecret);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
