package com.brayan.gestortareas.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.brayan.gestortareas.model.Usuario;
import com.brayan.gestortareas.repository.UsuarioRepository;

@Service

public class UsuarioService {
    
    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario guardarUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public Optional<Usuario> buscarEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }

    public Optional<Usuario> buscarId(Long id) {
        return usuarioRepository.findById(id);
    }

}
