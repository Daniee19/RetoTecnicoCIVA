package com.retotecnico.backend.service.impl;

import com.retotecnico.backend.dto.UsuarioDTO;

import com.retotecnico.backend.entity.Usuario;
import com.retotecnico.backend.repository.UsuarioRepository;
import com.retotecnico.backend.service.IAuthService;
import com.retotecnico.backend.service.JwtService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Map;

@Service
public class AuthServiceImpl implements IAuthService {

    @Autowired
    UsuarioRepository usuarioRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Override
    public String login(UsuarioDTO request) {

        System.out.println("El correo es: " + request.getNombreUsuario());
        System.out.println("La contraseña es: " + request.getPassword());

        //1. Autenticar usuario
        Usuario usu = usuarioRepository.findByUsername(request.getNombreUsuario()).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        UsuarioDTO usuario = new UsuarioDTO(usu.getId(), usu.getNombreUsuario(), usu.getPassword());

        //Se compara la contraseña ingresada (texto plano), con la contraseña hasheada de la base de datos
        if (!passwordEncoder.matches(request.getPassword(), usuario.getPassword())) {
            throw new RuntimeException("Contraseña incorrecta");
        }

        //Usamos User para que Spring boot lo identifique como algo estándar
        User user = new User(
                usuario.getNombreUsuario(),         // username
                usuario.getPassword(),       // password (ya encriptada en BD)
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")) // autoridad mínima
        );

        return jwtService.generateToken(user);
    }

    @Override
    public ResponseEntity<?> register(UsuarioDTO request) {

        Usuario usuario = Usuario.builder()
                .nombreUsuario(request.getNombreUsuario())
                .password(passwordEncoder.encode(request.getPassword())).build();
        usuarioRepository.save(usuario);

        return ResponseEntity.ok(Map.of("mensaje", "El usuario se ha registrado correctamente"));
    }
}
