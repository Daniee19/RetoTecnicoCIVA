package com.retotecnico.backend.restcontroller;

import com.retotecnico.backend.service.IBusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class BusRestController {

    @Autowired
    IBusService busService;

    @GetMapping("/bus")
    public ResponseEntity<?> getAllBus() {
        return ResponseEntity.ok(busService.getAllBuses());
    }
    @GetMapping("/bus/{id}")
    public ResponseEntity<?> getBusById(@PathVariable Long id) {
        return ResponseEntity.ok(busService.getBus(id));
    }

}
