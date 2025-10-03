package com.retotecnico.backend.service.impl;

import com.retotecnico.backend.dto.BusDTO;
import com.retotecnico.backend.entity.Bus;
import com.retotecnico.backend.exception.BusNoEncontrado;
import com.retotecnico.backend.repository.BusRepository;
import com.retotecnico.backend.service.IBusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BusServiceImpl implements IBusService {

    @Autowired
    private BusRepository busRepository;

    @Override
    public List<BusDTO> getAllBuses() {
        return busRepository.findAll().stream()
                .map(
                        bus -> new BusDTO(
                                bus.getId(),
                                bus.getNumeroBus(),
                                bus.getPlaca(),
                                bus.getFechaCreacion(),
                                bus.getCaracteristicas(),
                                busRepository.findMarcaByBusId(bus.getId()),
                                bus.getEstadoActivo()
                        )//Solucionar problema
                )
                .toList();
    }

    @Override
    public BusDTO getBus(Long id) {
        Bus busObt = busRepository.findById(id).orElseThrow(()-> new BusNoEncontrado(id));
        return new BusDTO(busObt.getId(), busObt.getNumeroBus(),
                busObt.getPlaca(), busObt.getFechaCreacion(), busObt.getCaracteristicas(),
                busRepository.findMarcaByBusId(busObt.getId()), busObt.getEstadoActivo());
    }
}
