package com.setu.setu.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.setu.setu.models.reviews;
import com.setu.setu.services.*;


import org.springframework.http.ResponseEntity;
import java.util.Map;







@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = {"http://localhost:3000", "https://*.up.railway.app", "https://*.railway.app"}, allowCredentials = "true")
public class UserController {
    @Autowired
    private servicesservice servicesservice;
    @Autowired
    private bookingsservices bookingsservices;
    @Autowired
    private reviewsservice reviewsservice;
    @Autowired
    private reportservices reportservice;

    @PostMapping("/me")
    public ResponseEntity<?> postMethodName(@RequestBody Map<String,Object> entity) {


        return servicesservice.getActiveServices(entity);
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


    @PostMapping("/review")
    public ResponseEntity<?> postMethodaddreview(@RequestBody Map<String, Object> entity) {
        return reviewsservice.addreview(entity);
    }

    @PostMapping("/reviews")
    public ResponseEntity<?> postMethodaddreviews(@RequestBody Map<String, Object> entity) {
        return reviewsservice.reviews(entity);
    }

    @PostMapping("/reports")
    public ResponseEntity<?> postMethodreport(@RequestBody Map<String, Object> entity) {
        return ResponseEntity.ok(reportservice.getreportsbyemail(entity.get("email").toString()));
    }

    @PostMapping("/reports/submit")
        public ResponseEntity<?> postmethodaddreport(@RequestBody Map<String, Object> entity) {
            return reportservice.addreport(entity);
        }
    
}
