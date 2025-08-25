package com.setu.setu.DTO;

import com.setu.setu.models.serviceproviders;
import com.setu.setu.models.user;

import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

public class reviewsDTO {
    private Long id;
    private float rating; 
    private String comment; 

    public reviewsDTO() {}

    public reviewsDTO(Long id, float rating, String comment) {
        this.id = id;
        
        this.rating = rating;
        this.comment = comment;
    }


    // getters and setters

    public Long getId() {
        return id;
    }

    public float getRating() {
        return rating;
    }

    public String getComment() {
        return comment;
    }
    

}
