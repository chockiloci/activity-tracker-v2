package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication 
// glavna anotacija, ki omogoča:
// - @Configuration (spring konfiguracija)
// - @EnableAutoConfiguration (samodejna konfiguracija aplikacije)
// - @ComponentScan (iskanje komponent v paketu com.example.demo in podpaketih)
public class DemoApplication {

    // glavna metoda za zagon aplikacije
    public static void main(String[] args) {
        // zažene Spring Boot aplikacijo
        SpringApplication.run(DemoApplication.class, args);
    }
}