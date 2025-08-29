package com.setu.setu.services;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import com.setu.setu.reposoratory.*;
import com.setu.setu.models.*;
import java.util.Map;
import com.setu.setu.DTO.AdminstatsDTO;
import java.util.List;
import com.setu.setu.DTO.usersDTO;


@Service
public class AdminServices {
    private final userdetailreposiraotry userDetailRepository;
    private final serviceprovidersreposiratory serviceProviderRepository;
    private final servicereposiratory serviceRepository;
    private final reportsreposiratory reportsRepository;
    private final UserRepository userRepository;


    public AdminServices(userdetailreposiraotry userDetailRepository, serviceprovidersreposiratory serviceProviderRepository, servicereposiratory serviceRepository, reportsreposiratory reportsRepository, UserRepository userRepository) {
        this.userDetailRepository = userDetailRepository;
        this.serviceProviderRepository = serviceProviderRepository;
        this.serviceRepository = serviceRepository;
        this.reportsRepository = reportsRepository;
        this.userRepository = userRepository;


    }

    public ResponseEntity<?> getAdminStats(@RequestBody Map<String,Object> entity){
        String email = (String) entity.get("email");
        user user = userRepository.findByEmail(email);
        String Type = user.getType();
        if(!Type.equals("admin")){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }

        AdminstatsDTO stats = new AdminstatsDTO();
        stats.setTotalUsers((int)userDetailRepository.count());
        stats.setTotalServiceProviders((int)serviceProviderRepository.count());
        stats.setTotalServices((int)serviceRepository.count());
        stats.setTotalReports((int)reportsRepository.count());

        return ResponseEntity.ok(stats);
    }

    public ResponseEntity<?> getAllUsers(@RequestBody Map<String,Object> entity){
        String email = (String) entity.get("email");
        user user = userRepository.findByEmail(email);
        String Type = user.getType();
        if(!Type.equals("admin")){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }
        List<user> users = userRepository.findByType("user");
        List<user> adminUsers = userRepository.findByType("admin");
        users.addAll(adminUsers);
        if (users.isEmpty()) {
            return ResponseEntity.ok("");
        }

        List<usersDTO> userDTOs = users.stream()
        .map(u -> {
            usersDTO dto = new usersDTO();
            dto.setId(u.getId());
            dto.setName(u.getFullName());
            dto.setType(u.getType());
            dto.setEmail(u.getEmail());
            return dto;
        }).toList();

        return ResponseEntity.ok(userDTOs);
    }


    public ResponseEntity<?> getAllServiceProviders(@RequestBody Map<String,Object> entity){
        String email = (String) entity.get("email");
        user user = userRepository.findByEmail(email);
        String Type = user.getType();
        if(!Type.equals("admin")){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }
        List<user> users = userRepository.findByType("service_provider");
        if (users.isEmpty()) {
            return ResponseEntity.ok(users);
        }

        List<usersDTO> userDTOs = users.stream()
        .map(u -> {
            usersDTO dto = new usersDTO();
            dto.setId(u.getId());
            dto.setName(u.getFullName());
            dto.setType(u.getType());
            dto.setEmail(u.getEmail());
            return dto;
        }).toList();

        return ResponseEntity.ok(userDTOs);
    }
    
    public ResponseEntity<?> makeAdmin(@RequestBody Map<String, Object> entity) {
        String email = (String) entity.get("email");
       

        

        user targetUser = userRepository.findByEmail(email);
        if (targetUser == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Target user not found");
        }

        targetUser.setType("admin");
        userRepository.save(targetUser);

        return ResponseEntity.ok("User promoted to admin successfully");
    }
}
