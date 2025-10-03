package com.retotecnico.backend.config;

import com.retotecnico.backend.dto.UsuarioDTO;
import com.retotecnico.backend.entity.Usuario;
import com.retotecnico.backend.repository.UsuarioRepository;
import com.retotecnico.backend.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class AutenticacionFiltroJwt extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    /**
     * El doFilterInternal se ejecuta antes de llegar al controlador.
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String username;

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        jwt = authHeader.substring(7); // Quita el "Bearer "
        username = jwtService.extractUsername(jwt); //te da el email o nombre de usuario

        /**
         * Evita procesar 2 veces la autenticación en el contexto de la seguridad (creo que es un bloque sobre si ya fue evaluado)
         */
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            Usuario usu = usuarioRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("Error"));
            UsuarioDTO usuario = new UsuarioDTO(usu.getId(), usu.getNombreUsuario(), usu.getPassword());

            User usuarioAutenticado = new User(
                    usuario.getNombreUsuario(),
                    usuario.getPassword(),
                    Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")));

            if (jwtService.isTokenValid(jwt, usuarioAutenticado)) {
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(usuarioAutenticado, null, usuarioAutenticado.getAuthorities());

                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        /**
         * filterChain.doFilter(request, response) es lo que permite que la solicitud siga su camino una vez que el
         * filtro (en este caso, de JWT) haya hecho su trabajo. Si no se coloca, es como si detuvieras la ejecución ahí
         * mismo.
         */
        filterChain.doFilter(request, response);
    }
}