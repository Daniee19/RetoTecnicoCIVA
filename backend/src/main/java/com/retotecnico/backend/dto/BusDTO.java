package com.retotecnico.backend.dto;

import com.retotecnico.backend.entity.MarcaBus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.io.Serializable;
import java.time.LocalDate;

@Data
@Getter
@Setter
@NoArgsConstructor

@Builder
public class BusDTO implements Serializable {
    private Long id;
    private int numeroBus;
    private String placa;
    private LocalDate fechaCreacion;
    private String caracteristicas;

    private MarcaBusDTO marcaBus;

    private Boolean estadoActivo;

    public BusDTO(Long id, int numeroBus, String placa, LocalDate fechaCreacion, String caracteristicas,
                  MarcaBusDTO marcaBus, Boolean estadoActivo) {
        this.id = id;
        this.numeroBus = numeroBus;
        this.placa = placa;
        this.fechaCreacion = fechaCreacion;
        this.caracteristicas = caracteristicas;
        this.marcaBus = marcaBus;
        this.estadoActivo = estadoActivo;
    }

}
