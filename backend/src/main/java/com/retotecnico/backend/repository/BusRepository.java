package com.retotecnico.backend.repository;

import com.retotecnico.backend.dto.BusDTO;
import com.retotecnico.backend.dto.MarcaBusDTO;
import com.retotecnico.backend.entity.Bus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BusRepository extends JpaRepository<Bus, Long> {
    @Query("SELECT b.marcaBus FROM Bus b WHERE b.id = :idBus")
    MarcaBusDTO findMarcaByBusId(@Param("idBus") Long idBus);
}
