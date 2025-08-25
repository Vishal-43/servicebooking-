package com.setu.setu.reposoratory;
import com.setu.setu.models.ServiceImage;
import com.setu.setu.models.services;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceImageRepository extends JpaRepository<ServiceImage, Long> {
    // You can add query methods, e.g., findByService to retrieve images for service
    List<ServiceImage> findByService_id(Long serviceId);
    void deleteByService_id(Long serviceId);
}
