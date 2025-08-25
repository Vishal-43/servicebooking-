package com.setu.setu.services;

import com.setu.setu.models.user;
import com.setu.setu.reposoratory.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class userservice {

    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public user registerUser(user user) {
        // hash password before saving
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        return userRepository.save(user);
    }


    public List<user> getAllUsers() {
        // This simply fetches all user records from DB
        return userRepository.findAll();
    }
   
}
