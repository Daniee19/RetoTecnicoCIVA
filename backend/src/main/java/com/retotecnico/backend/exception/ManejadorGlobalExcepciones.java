package com.retotecnico.backend.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class ManejadorGlobalExcepciones {

    //Cuando hay un error con BusNoEncontrado se llama a esta función
    @ExceptionHandler(BusNoEncontrado.class)
    public ResponseEntity<Map<String, String>> handleBusNoEncontrado(BusNoEncontrado ex) {
        // Devuelve un JSON con un mensaje amigable y status 404
        return ResponseEntity.status(404)
                .body(Map.of("mensaje", ex.getMessage()));
    }
}
