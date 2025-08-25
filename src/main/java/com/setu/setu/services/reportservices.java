package com.setu.setu.services;

import org.springframework.stereotype.Service;
import com.setu.setu.models.*;
import com.setu.setu.reposoratory.*;
import com.setu.setu.DTO.reportDTO;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.Map;
import com.setu.setu.controller.Authcontroller.ApiResponse;



@Service
public class reportservices {
    public final reportsreposiratory reportsreposiratory;
    public final UserRepository userRepository;

    public reportservices(reportsreposiratory reportsreposiratory, UserRepository userRepository) {
        this.reportsreposiratory = reportsreposiratory;
        this.userRepository = userRepository;
    }

    public List<reportDTO> getreportsbyemail(String email) {
        user user = userRepository.findByEmail(email);
        if(user == null){
            throw new RuntimeException("User not found");

        }

        List<reports> reports = reportsreposiratory.findByUser_id(user.getId());
        return reports.stream().map(this::mapToDTO).collect(Collectors.toList());


    }

    public ResponseEntity<?> addreport(@RequestBody Map<String, Object> entity){
        String email = (String) entity.get("email");
        user user = userRepository.findByEmail(email);
        if(user == null){
            throw new RuntimeException("User not found");

        }

        reports report = new reports();
        report.setUser(user);
        report.setContent(entity.get("report").toString());
        report.setStatus("pending");
        report.setCreatedAt(LocalDateTime.now());

        reportsreposiratory.save(report);
        return ResponseEntity.ok(new ApiResponse(true, "Report added successfully"));

    }


    private reportDTO mapToDTO(reports report) {
        reportDTO dto = new reportDTO();
        dto.setId(report.getId());
        dto.setContent(report.getContent());
        dto.setStatus(report.getStatus());
        dto.setCreatedAt(report.getCreatedAt());
        return dto;
    }
    
}
