package com.brayan.gestortareas.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.brayan.gestortareas.model.Tarea;
import com.brayan.gestortareas.repository.TareaRepository;

@Service

public class TareaService {
    @Autowired
    private TareaRepository tareaRepository;

    public Tarea crearTarea(Tarea tarea) {
        return tareaRepository.save(tarea);
    }

    public Tarea actualizarTarea(Tarea tarea) {
        return tareaRepository.save(tarea);
    }

    public void eliminarTarea(Long id) {
        tareaRepository.deleteById(id);
    }

    public List<Tarea> obtenerTareasPorUsuarioId(Long usuarioId) {
        return tareaRepository.findByUsuarioId(usuarioId);
    }
}
