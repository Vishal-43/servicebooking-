package com.setu.setu.config;

import org.springframework.http.ResponseEntity;
// import jakarta.persistence.*;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.setu.setu.controller.Authcontroller.ApiResponse;



@ControllerAdvice
public class exceptionhandler {
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ApiResponse> handleUserNotFound(UserNotFoundException ex) {
        return ResponseEntity.badRequest().body(new ApiResponse(false, "User not found"));
    }
}
