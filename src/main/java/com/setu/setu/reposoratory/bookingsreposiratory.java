package com.setu.setu.reposoratory;

import org.springframework.data.jpa.repository.JpaRepository;
import com.setu.setu.models.*;
import java.util.List;  
import org.springframework.stereotype.Repository;

@Repository
public interface bookingsreposiratory extends JpaRepository<bookings, Long> {
    
    List<bookings> findByUserDetails_Id(Long userId);

    List<bookings> findByServiceProvider_Id(Long serviceProviderId);

    List<bookings> findByServiceProvider(serviceproviders serviceProvider);

}
