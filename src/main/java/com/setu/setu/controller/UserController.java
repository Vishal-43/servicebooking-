package com.setu.setu.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.setu.setu.services.bookingsservices;
import com.setu.setu.services.servicesservice;

import org.springframework.http.ResponseEntity;
import java.util.Map;




@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {
    @Autowired
    private servicesservice servicesservice;
    @Autowired
    private bookingsservices bookingsservices;

    @PostMapping("/me")
    public ResponseEntity<?> postMethodName(@RequestBody Map<String,Object> entity) {
        
        
        return servicesservice.getActiveServices();
    }
    
    

    @PostMapping("/book")
    public ResponseEntity<?> bookService(@RequestBody Map<String,Object> entity) {
        return bookingsservices.bookService(entity);
    }


    @PostMapping("/orders")
    public ResponseEntity<?> getUserOrders(@RequestBody Map<String,Object> entity) {
        String email = (String) entity.get("email");
        return bookingsservices.getUserBookings(email);
    }
}
