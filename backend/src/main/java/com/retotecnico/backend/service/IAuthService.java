package com.retotecnico.backend.service;

import com.retotecnico.backend.dto.UsuarioDTO;
import org.springframework.http.ResponseEntity;

public interface IAuthService {
    String login(UsuarioDTO usuario);
    ResponseEntity<?> register(UsuarioDTO usuario);
}
