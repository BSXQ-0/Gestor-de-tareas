package com.brayan.gestortareas.gestor_tareas_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication(scanBasePackages = "com.brayan.gestortareas")
@EnableJpaRepositories(basePackages = "com.brayan.gestortareas.repository")
@EntityScan(basePackages = "com.brayan.gestortareas.model")
public class GestorTareasApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(GestorTareasApiApplication.class, args);
	}

}
