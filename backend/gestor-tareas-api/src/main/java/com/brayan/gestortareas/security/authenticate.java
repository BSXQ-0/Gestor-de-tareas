package com.brayan.gestortareas.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.brayan.gestortareas.model.Register;
import com.brayan.gestortareas.model.Rol;
import com.brayan.gestortareas.model.Usuario;
import com.brayan.gestortareas.model.log;
import com.brayan.gestortareas.repository.UsuarioRepository;


@Service

public class authenticate {
    
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private generateValidate generateValidate;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String login(log log) throws Exception {
        Usuario user = usuarioRepository.findByEmail(log.email)
                .orElseThrow(() -> new Exception("Email no encontrado"));

        if (passwordEncoder.matches(log.contrasena, user.getContrasena())) {
            return generateValidate.generateToken(user.getEmail());
        }else {
            throw new RuntimeException("Contraseña incorrecta");
        }
  
    }

    public Usuario register(Register register){
        Usuario usuario = new Usuario();
        usuario.setNombre(register.getNombre());
        usuario.setEmail(register.getEmail());
        usuario.setContrasena(passwordEncoder.encode(register.getContrasena()));
        usuario.setRol(Rol.ROLE_USER);
        return usuarioRepository.save(usuario);
    }

}
