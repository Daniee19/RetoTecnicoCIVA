package com.retotecnico.backend.repository;

import com.retotecnico.backend.dto.UsuarioDTO;
import com.retotecnico.backend.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    @Query("SELECT p FROM Usuario p WHERE p.nombreUsuario = :nombreUsuario")
    Optional<Usuario> findByUsername(String nombreUsuario);
}
