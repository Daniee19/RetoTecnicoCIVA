package com.retotecnico.backend.dto;

import lombok.Builder;

import java.io.Serializable;
import java.util.List;

@Builder
public class MarcaBusDTO implements Serializable {

    private Long id;
    private String nombreMarca;
    private List<BusDTO> buses;

}
