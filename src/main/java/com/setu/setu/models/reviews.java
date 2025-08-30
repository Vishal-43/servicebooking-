package com.setu.setu.models;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Id;

@Entity
public class reviews {
   @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
   
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "u_id") 
    private user user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "s_id") 
    private serviceproviders serviceProvider;

    



    private float rating; 
    private String comment; 
    private String reviewDate; 


    public reviews() {}
    public reviews(user user, float rating, String comment, String reviewDate, serviceproviders serviceProvider) {
        this.user = user;
        this.rating = rating;
        this.comment = comment;
        this.reviewDate = reviewDate;
        this.serviceProvider = serviceProvider;
    }
   
    public Long getId() {
        return id;
    }


    public void setId(Long id) {
        this.id = id;
    }
    public user getUser() {
        return user;
    }
    public void setUser(user user) {
        this.user = user;
    }

    public serviceproviders getServiceProvider() {
        return serviceProvider;
    }
    public void setServiceProvider(serviceproviders serviceProvider) {
        this.serviceProvider = serviceProvider;
    }

    public float getRating() {
        return rating;
    }
    public void setRating(float rating) {
        this.rating = rating;
    }
    public String getComment() {
        return comment;
    }
    public void setComment(String comment) {
        this.comment = comment;
    }
    public String getReviewDate() {
        return reviewDate;
    }
    public void setReviewDate(String reviewDate) {
        this.reviewDate = reviewDate;
    }
    @Override
    public String toString() {
        return "reviews{" +
                "id=" + id +
                ", user=" + user +
                ", rating=" + rating +
                ", comment='" + comment + '\'' +
                ", reviewDate='" + reviewDate + '\'' +
                '}';
    }
}
