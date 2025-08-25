package com.setu.setu.services;

import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.setu.setu.DTO.*;
import com.setu.setu.controller.Authcontroller.ApiResponse;
import com.setu.setu.models.*;
import com.setu.setu.reposoratory.*;


@Service
public class servicesservice {

    private final servicereposiratory serviceRepository;
    private final ServiceImageRepository serviceImageRepo;


    public servicesservice(servicereposiratory serviceRepository,ServiceImageRepository serviceImageRepo) {
        this.serviceRepository = serviceRepository;
        this.serviceImageRepo = serviceImageRepo;
    }

    public ResponseEntity<?> getActiveServices() {
        List<services> services = serviceRepository.findByStatus("active");
		
		if (services.isEmpty()) {
			return ResponseEntity.ok(new ApiResponse(false, "No services available"));
		}
		List<com.setu.setu.DTO.servicesDTO> serviceDTOs = services.stream()
			.map(svc -> {
				List<ServiceImage> serviceImages = serviceImageRepo.findByService_id(svc.getId());
				return new com.setu.setu.DTO.servicesDTO(
					svc.getId(),
					svc.getServiceName(),
					svc.getServiceDescription(),
					serviceImages.stream()
						.map(img -> Base64.getEncoder().encodeToString(img.getImageData()))
						.collect(Collectors.toList()),
					svc.getServicePrice(),
					svc.getServiceCategory()
				);
			})
			.toList();

		return ResponseEntity.ok(serviceDTOs);
        
    }


    

    }

