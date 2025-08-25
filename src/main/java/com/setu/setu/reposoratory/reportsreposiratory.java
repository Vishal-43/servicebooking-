package com.setu.setu.reposoratory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.setu.setu.models.*; // Adjust the package path as needed
import java.util.List;


@Repository
public interface reportsreposiratory extends JpaRepository<reports,Long> {
	List<reports> findByUser_id(Long userId);

    
}
