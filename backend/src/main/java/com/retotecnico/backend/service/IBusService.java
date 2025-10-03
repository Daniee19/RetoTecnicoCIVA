package com.retotecnico.backend.service;

import com.retotecnico.backend.dto.BusDTO;
import com.retotecnico.backend.entity.Bus;

import java.util.List;

public interface IBusService {
    public List<BusDTO> getAllBuses();
    public BusDTO getBus(Long id);
}
