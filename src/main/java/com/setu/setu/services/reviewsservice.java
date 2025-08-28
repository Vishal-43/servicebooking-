package com.setu.setu.services;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Map;

import com.setu.setu.DTO.reviewsDTO;
import com.setu.setu.controller.Authcontroller.ApiResponse;
import com.setu.setu.models.bookings;
import com.setu.setu.models.serviceproviders;
import com.setu.setu.models.user;
import com.setu.setu.models.userdetails;
import com.setu.setu.reposoratory.UserRepository;
import com.setu.setu.reposoratory.bookingsreposiratory;
import com.setu.setu.reposoratory.reviewsreposiratory;
import com.setu.setu.reposoratory.userdetailreposiraotry;
import com.setu.setu.models.reviews;
import java.util.List;
import java.time.LocalDate;

import java.util.Optional;
import java.util.stream.Collectors;

// import com.setu.setu.servicesvb .*;

@Service
public class reviewsservice {

    private final UserRepository userRepository;
    private final reviewsreposiratory reviewsrepository;
    private final bookingsreposiratory bookingsreposiratory;

    public reviewsservice(reviewsreposiratory reviewsrepository, bookingsreposiratory bookingsreposiratory, UserRepository userRepository) {
        this.reviewsrepository = reviewsrepository;
        this.bookingsreposiratory = bookingsreposiratory;
        this.userRepository = userRepository;
    }

    public ResponseEntity<?> addreview(@RequestBody Map<String, Object> entity){
            Long id = null;
            Object idObj = entity.get("orderId");
            if (idObj instanceof Number) {
                id = ((Number) idObj).longValue();
            } else if (idObj instanceof String) {
                try {
                    id = Long.parseLong((String) idObj);
                } catch (NumberFormatException e) {
                    return ResponseEntity.badRequest().body(new ApiResponse(false, "Invalid service id"));
                }
            } else {
                return ResponseEntity.badRequest().body(new ApiResponse(false, "Service id is required"));
            }

            Optional<bookings> booking = bookingsreposiratory.findById(id);
            if(booking.isEmpty()){
                return ResponseEntity.badRequest().body(new ApiResponse(false, "Invalid booking id"));

            }

            serviceproviders sp = booking.get().getServiceProvider();
            
            userdetails user = booking.get().getUserDetails();

            reviews review = new reviews();
            review.setUser(user.getUser());
            review.setServiceProvider(sp);
            review.setRating((Integer) entity.get("rating"));
            review.setComment((String) entity.get("comment"));
            review.setReviewDate(LocalDate.now().toString());

            reviewsrepository.save(review);
            return ResponseEntity.ok(new ApiResponse(true, "Review added successfully"));
        }

    public ResponseEntity<?> reviews(@RequestBody Map<String,Object> entity){
            String email = (String) entity.get("email");
            user user = userRepository.findByEmail(email);
            Long uid = user.getId();
            List<reviews> reviews = reviewsrepository.findByUser_Id(uid);

            List<reviewsDTO> reviewsDTOList = reviews.stream().map(r -> {
                    reviewsDTO rdto = new reviewsDTO();
                    rdto.setId(r.getId());
                    rdto.setRating(r.getRating());
                    rdto.setComment(r.getComment());
                    rdto.setReviewDate(r.getReviewDate());
                    // add more fields if needed
                    return rdto;
                }).collect(Collectors.toList());

            return ResponseEntity.ok(reviewsDTOList);
    }


    }

