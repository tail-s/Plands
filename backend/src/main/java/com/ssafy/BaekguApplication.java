package com.ssafy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing

// Swagger3: http://localhost:9999/baekgu/swagger-ui/index.html

public class BaekguApplication {

	public static void main(String[] args) { SpringApplication.run(BaekguApplication.class, args); }

}
