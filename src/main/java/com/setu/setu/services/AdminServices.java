package com.setu.setu.services;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import com.setu.setu.reposoratory.*;
import com.setu.setu.models.*;
import java.util.Map;
import com.setu.setu.DTO.AdminstatsDTO;


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



}
