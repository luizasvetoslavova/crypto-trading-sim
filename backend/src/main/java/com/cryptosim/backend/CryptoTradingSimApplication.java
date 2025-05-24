package com.cryptosim.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class CryptoTradingSimApplication {

	public static void main(String[] args) {
		SpringApplication.run(CryptoTradingSimApplication.class, args);
	}
}