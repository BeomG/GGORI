package com.kkori.kkori;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class KkoriApplication {

    public static void main(String[] args) {
        SpringApplication.run(KkoriApplication.class, args);
    }

}
