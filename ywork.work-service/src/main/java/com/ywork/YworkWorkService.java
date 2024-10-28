package com.ywork;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

import java.util.TimeZone;

@SpringBootApplication
@EnableDiscoveryClient
public class YworkWorkService{

	public static void main(String[] args) {
		SpringApplication.run(YworkWorkService.class, args);
		TimeZone.setDefault(TimeZone.getTimeZone("UTC +7"));
	}

}
