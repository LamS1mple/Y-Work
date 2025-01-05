package com.ywork.filter;

import com.nimbusds.jose.shaded.gson.Gson;
import com.nimbusds.jose.shaded.gson.JsonObject;
import com.ywork.api.dto.out.RoleOut;
import com.ywork.api.dto.out.UserOut;
import com.ywork.api.responsitory.UserResponsitory;
import com.ywork.api.responsitory.helper.RoleRepository;
import com.ywork.security.JwtManager;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.ContentCachingRequestWrapper;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Component
@AllArgsConstructor
public class JwtTokenFilter extends OncePerRequestFilter {
    private final JwtManager jwtManager;
    private final UserResponsitory userResponsitory;
    private final Gson gson = new Gson();
    private final RoleRepository roleRepository;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String requestPath = request.getServletPath();
        String body = null;
        if (requestPath.startsWith("/public")) {
            filterChain.doFilter(request, response);
            return;
        }
        String checkRole = null;
        String methob = request.getMethod();
        switch (methob) {
            case "POST":
                if (requestPath.endsWith("/company/create-company")) break;
                byte[] byteArray = request.getInputStream().readAllBytes();
                String requestBody = new String(byteArray);
                body = requestBody;
                JsonObject jsonObject = null;

                try {
                    jsonObject = gson.fromJson(requestBody, JsonObject.class);
                }catch (Exception e){
                    break;
                }
//                if (jsonObject.has("companyManagerId")){
//                    checkRole = jsonObject.get("companyManagerId").getAsString();
//                }
                if (checkRole == null && jsonObject.has("companyId")) {
                    checkRole = jsonObject.get("companyId").getAsString();
                }
                if (checkRole == null && jsonObject.has("idCompany")) {
                    checkRole = jsonObject.get("idCompany").getAsString();
                }

                break;
            case "GET":
                checkRole = request.getParameter("companyManagerId");
                if (checkRole == null) {
                    checkRole = request.getParameter("companyId");
                }
                if (checkRole == null) {
                    checkRole = request.getParameter("idCompany");
                }
                break;
        }
        String tokenHeader = request.getHeader("Authorization");
        if (tokenHeader != null && tokenHeader.startsWith("Bearer ")){
            String token = tokenHeader.substring(7);
            if (!token.equals("null") && jwtManager.validateJwtToken(token)){
                UserOut userDetails = userResponsitory.loadUserByUsername(jwtManager.getUsername(token));
                List<RoleOut> list = roleRepository.getRole(checkRole, userDetails.getUserId());
                SecurityContextHolder.getContext().setAuthentication(
                        new UsernamePasswordAuthenticationToken(userDetails, null,
                                list.stream().map(role-> new SimpleGrantedAuthority(role.getName())).toList()));
            }
        }
        switch (methob) {
            case "POST":
                if (requestPath.endsWith("/company/create-company")) {
                    filterChain.doFilter(request, response);
                    return;
                }

                filterChain.doFilter(new RequestWrapper(request, body), response);
                break;
            case "GET":
                filterChain.doFilter(request, response);
                break;
        }
    }
}
