package com.setu.setu.services;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import com.setu.setu.reposoratory.*;
import com.setu.setu.models.*;
import java.util.Map;
import com.setu.setu.DTO.AdminstatsDTO;
import com.setu.setu.DTO.serviceDTO;

import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.setu.setu.DTO.usersDTO;
import com.setu.setu.DTO.servicesDTO;
import com.setu.setu.controller.Authcontroller.ApiResponse;


@Service
public class AdminServices {
    private final userdetailreposiraotry userDetailRepository;
    private final serviceprovidersreposiratory serviceProviderRepository;
    private final servicereposiratory serviceRepository;
    private final reportsreposiratory reportsRepository;
    private final UserRepository userRepository;
    private final ServiceImageRepository serviceImageRepo;

    public AdminServices(userdetailreposiraotry userDetailRepository, serviceprovidersreposiratory serviceProviderRepository, servicereposiratory serviceRepository, reportsreposiratory reportsRepository, UserRepository userRepository, ServiceImageRepository serviceImageRepo) {
        this.userDetailRepository = userDetailRepository;
        this.serviceProviderRepository = serviceProviderRepository;
        this.serviceRepository = serviceRepository;
        this.reportsRepository = reportsRepository;
        this.userRepository = userRepository;
        this.serviceImageRepo = serviceImageRepo;
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

    public ResponseEntity<?> getAllReports(@RequestBody Map<String, Object> entity) {
        String email = (String) entity.get("email");
        user targetUser = userRepository.findByEmail(email);
        if (targetUser == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Target user not found");
        }

        if (!targetUser.getType().equals("admin")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }

        List<reports> reports = reportsRepository.findAll();
        return ResponseEntity.ok(reports);
    }

    public ResponseEntity<?> updateReportStatus(@RequestBody Map<String, Object> entity) {
         Long id = null;
        Object idObj = entity.get("id");
        if (idObj instanceof Number) {
            id = ((Number) idObj).longValue();
        } else if (idObj instanceof String) {
            try {
                id = Long.parseLong((String) idObj);
            } catch (NumberFormatException e) {
                return ResponseEntity.badRequest().body(new ApiResponse(false, "Invalid service id"));
            }
        } else {
            return ResponseEntity.badRequest().body(new ApiResponse(false, "Service id is required"));
        }

        Optional<reports> report = reportsRepository.findById(id);
        if (report.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(false, "Report not found"));
        }

        // Update the report status
        report.get().setStatus((String) entity.get("status"));
        reportsRepository.save(report.get());
        return ResponseEntity.ok(new ApiResponse(true, "Report status updated successfully"));

    }


    public ResponseEntity<?> getallservices(@RequestBody Map<String,Object> entity){
        String email = (String) entity.get("email");
        user user = userRepository.findByEmail(email);
        String Type = user.getType();
        if(!Type.equals("admin")){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }
        List<services> services = serviceRepository.findAll();
        if (services.isEmpty()) {
            return ResponseEntity.ok("");
        }

        List<serviceDTO> serviceDTOs = services.stream()
        .map(svc -> {
            List<ServiceImage> serviceImages = serviceImageRepo.findByService_id(svc.getId());
            return new serviceDTO(
                svc.getId(),
                svc.getServiceName(),
                svc.getServiceDescription(),
                serviceImages.stream()
                    .map(img -> Base64.getEncoder().encodeToString(img.getImageData()))
                    .collect(Collectors.toList()),
                svc.getServicePrice(),
                svc.getServiceCategory(),
                svc.getServiceProvider().getUser().getFullName(),
                svc.getStatus()
            );
        }).toList();

        return ResponseEntity.ok(serviceDTOs);
    }

}

