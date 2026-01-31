package com.brayan.gestortareas.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.brayan.gestortareas.model.Tarea;

public interface TareaRepository extends JpaRepository<Tarea, Long> {

    List<Tarea> findByUsuarioId(Long usuarioId);
}
