package com.setu.setu.reposoratory;

// import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import com.setu.setu.models.serviceproviders;

public interface serviceprovidersreposiratory extends CrudRepository<serviceproviders, Long> {
    serviceproviders findByUserId(Long userId);
    serviceproviders findByEmail(String email);
    
    
}