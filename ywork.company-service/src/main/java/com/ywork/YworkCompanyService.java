package com.ywork;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

import java.util.TimeZone;

@SpringBootApplication
@EnableDiscoveryClient
public class YworkCompanyService{

	public static void main(String[] args) {
		SpringApplication.run(YworkCompanyService.class, args);
		TimeZone.setDefault(TimeZone.getTimeZone("UTC +7"));
	}

}
