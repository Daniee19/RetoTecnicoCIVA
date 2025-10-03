package com.retotecnico.backend.restcontroller;

import com.retotecnico.backend.dto.UsuarioDTO;
import com.retotecnico.backend.service.IAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthRestController {

    @Autowired
    IAuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UsuarioDTO request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UsuarioDTO request) {
        String token = authService.login(request);
        return ResponseEntity.ok(Map.of("token", token));
    }
}
