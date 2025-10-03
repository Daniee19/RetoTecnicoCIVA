package com.retotecnico.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class MarcaBus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombreMarca;

    //mapped by es la llave foránea que se va a conectar y aparecer
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "marcaBus", cascade = CascadeType.ALL)
    private List<Bus> buses;
}
