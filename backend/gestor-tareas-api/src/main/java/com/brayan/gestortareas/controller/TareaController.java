package com.brayan.gestortareas.controller;

import com.brayan.gestortareas.model.Tarea;
import com.brayan.gestortareas.service.TareaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tareas")
public class TareaController {

    @Autowired
    private TareaService tareaService;

    @PostMapping
    public Tarea crear(@RequestBody Tarea tarea) {
        return tareaService.crearTarea(tarea);
    }

    @PutMapping("/{id}")
    public Tarea actualizar(@PathVariable Long id, @RequestBody Tarea tarea) {
        tarea.setId(id);
        return tareaService.actualizarTarea(tarea);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        tareaService.eliminarTarea(id);
    }

    @GetMapping("/usuario/{usuarioId}")
    public List<Tarea> obtenerPorUsuarioId(@PathVariable Long usuarioId) {
        return tareaService.obtenerTareasPorUsuarioId(usuarioId);
    }

}