package com.retotecnico.backend.exception;

public class BusNoEncontrado extends RuntimeException{
    public BusNoEncontrado(Long id) {
        super("No se encontró el bus con id " + id);
    }
}
