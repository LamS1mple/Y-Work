package com.ywork;

import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

import java.util.Date;
import java.util.TimeZone;

@SpringBootApplication
@EnableDiscoveryClient
public class YworkCompanyService{

	public static void main(String[] args) {
		SpringApplication.run(YworkCompanyService.class, args);
	}

	@PostConstruct
	public void init() {
		TimeZone.setDefault(TimeZone.getTimeZone("GMT+7"));
	}
}
