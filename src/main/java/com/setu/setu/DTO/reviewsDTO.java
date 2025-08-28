package com.setu.setu.DTO;

// import com.setu.setu.models.serviceproviders;
// import com.setu.setu.models.user;

// import jakarta.persistence.FetchType;
// import jakarta.persistence.JoinColumn;
// import jakarta.persistence.ManyToOne;

public class reviewsDTO {
    private Long id;
    private float rating; 
    private String comment; 
    private String reviewDate; 

     

    public reviewsDTO() {}

    public reviewsDTO(Long id, float rating, String comment) {
        this.id = id;
        
        this.rating = rating;
        this.comment = comment;
    }
    public reviewsDTO(Long id, float rating, String comment, String reviewDate) {
        this.id = id;
        this.rating = rating;
        this.comment = comment;
        this.reviewDate = reviewDate;
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
    
    public String getReviewDate() {
        return reviewDate;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setRating(float rating) {
        this.rating = rating;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public void setReviewDate(String reviewDate) {
        this.reviewDate = reviewDate;
    }


}
