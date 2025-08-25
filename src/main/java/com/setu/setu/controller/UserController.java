package com.setu.setu.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.setu.setu.services.servicesservice;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;
import java.util.Map;




@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {
    @Autowired
    private servicesservice servicesservice;

    @PostMapping("/me")
    public ResponseEntity<?> postMethodName(@RequestBody Map<String,Object> entity) {
        
        
        return servicesservice.getActiveServices();
    }
    
    }

    

     

