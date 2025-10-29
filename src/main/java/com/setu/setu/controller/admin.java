package com.setu.setu.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.Map;
import com.setu.setu.services.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = {"http://localhost:3000", "https://*.up.railway.app", "https://*.railway.app"}, allowCredentials = "true")
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

    @PostMapping("/makeadmin")
    public ResponseEntity<?> postMethodmakeadmin (@RequestBody Map<String,Object> entity) {
        //TODO: process POST request

        return adminservices.makeAdmin(entity);
    }
    
    @PostMapping("/reports")
    public ResponseEntity<?> getAllReports(@RequestBody Map<String,Object> entity) {
        return adminservices.getAllReports(entity);
    }

    @PostMapping("/reports/status")
    public ResponseEntity<?> postMethodreportstatus(@RequestBody Map<String, Object> entity) {

        return adminservices.updateReportStatus(entity);
    }

    @PostMapping("/services")
    public ResponseEntity<?> postMethodservices(@RequestBody Map<String, Object> entity) {

        return adminservices.getallservices(entity);
    }

    @PostMapping("/services/status")
    public ResponseEntity<?> postMethodservicesstatus(@RequestBody Map<String, Object> entity) {

        return adminservices.updateServiceStatus(entity);
    }
    
}
