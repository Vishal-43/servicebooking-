package com.setu.setu.reposoratory;

// import com.setu.setu.models.serviceproviders;
import org.springframework.data.repository.CrudRepository;
import com.setu.setu.models.reviews;
import org.springframework.stereotype.Repository;
// import org.springframework.data.repository.CrudRepository;
import java.util.List;

// import com.setu.setu.models.serviceproviders;
@Repository
public interface reviewsreposiratory extends CrudRepository<reviews, Long> {

    List <reviews> findByUser_Id(Long userId);
    List <reviews> findByServiceProvider_Id(Long serviceProviderId);
    // Additional methods can be defined here as needed
}
