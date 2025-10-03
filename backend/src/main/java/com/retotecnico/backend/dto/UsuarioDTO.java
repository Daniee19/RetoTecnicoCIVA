package com.retotecnico.backend.dto;

import lombok.*;

import java.io.Serializable;

@Data
@Getter
@Setter
@NoArgsConstructor
@Builder
public class UsuarioDTO implements Serializable {
    private Long id;
    private String nombreUsuario;
    private String password;

    public UsuarioDTO(Long id, String nombreUsuario, String password) {
        this.id = id;
        this.nombreUsuario = nombreUsuario;
        this.password = password;
    }
}
