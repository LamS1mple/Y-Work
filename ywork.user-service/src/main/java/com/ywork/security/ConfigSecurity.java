package com.ywork.security;

import com.ywork.filter.JwtTokenFilter;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@AllArgsConstructor
@EnableWebSecurity
public class ConfigSecurity {

    private final JwtTokenFilter jwtTokenFilter;
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .cors(cors ->{
                    cors.configurationSource(corsConfigurationSource());
                })
                .authorizeHttpRequests(authorize ->{
          authorize.requestMatchers("/account/**").permitAll()
                  .anyRequest().authenticated();
        })
//                .exceptionHandling(exceptionHandling())
                .addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    UrlBasedCorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration  corsConfigurationSource = new CorsConfiguration();
        corsConfigurationSource.addAllowedHeader("*");
        corsConfigurationSource.addAllowedMethod("*");
        corsConfigurationSource.addAllowedOriginPattern("*");
        corsConfigurationSource.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfigurationSource);
        return source;
    }

}
