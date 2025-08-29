package com.setu.setu.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.Map;
import com.setu.setu.services.*;

import org.springframework.beans.factory.annotation.Autowired;
@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class admin {

    @Autowired
    private AdminServices adminservices;

    @PostMapping("/stats")
    public ResponseEntity<?> getAdminStats(@RequestBody Map<String,Object> entity) {
        return adminservices.getAdminStats(entity);
    }

    @PostMapping("/users")
    public ResponseEntity<?> getAllUsers(@RequestBody Map<String,Object> entity) {
        return adminservices.getAllUsers(entity);
    }

    @PostMapping("/serviceproviders")
    public ResponseEntity<?> getAllServiceProviders(@RequestBody Map<String,Object> entity) {
        return adminservices.getAllServiceProviders(entity);
    }


}
