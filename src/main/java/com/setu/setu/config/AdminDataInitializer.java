package com.setu.setu.config;

import com.setu.setu.models.user;
import com.setu.setu.reposoratory.UserRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminDataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    

    @Override
    public void run(String... args) {
        String adminEmail = "admin@setu.com";
        String adminPassword = "#nimda@setu"; // Change as needed

        if (userRepository.findByEmail(adminEmail) == null) {
            user admin = new user();
            admin.setEmail(adminEmail);
            admin.setPassword(passwordEncoder.encode(adminPassword));
            admin.setType("admin");
            admin.setFullName("Admin User");
            admin.setType("admin");
            // set other fields as needed
            userRepository.save(admin);
        
            System.out.println("Admin user created: " + adminEmail);
        }
    }
}