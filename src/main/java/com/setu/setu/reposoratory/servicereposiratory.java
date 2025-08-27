package com.setu.setu.reposoratory;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.setu.setu.models.services;


public interface servicereposiratory extends JpaRepository<services, Long> {
    List<services> findByServiceProvider_Id(Long serviceProviderId);
    void deleteById(Long id);

    List<services> findByStatus(String status);
}
