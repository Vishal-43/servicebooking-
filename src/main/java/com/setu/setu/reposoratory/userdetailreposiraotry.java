package com.setu.setu.reposoratory;

import com.setu.setu.models.userdetails;
// import com.setu.setu.models.userdetails;

import org.springframework.data.jpa.repository.JpaRepository;

public interface userdetailreposiraotry extends JpaRepository<userdetails, Long> {
    userdetails findByUserId(Long userId);
    
    
}
