package com.setu.setu.models;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
// import jakarta.persistence.OneToOne;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Id;
import com.setu.setu.models.services;
import java.time.LocalDateTime;



@Entity
public class bookings {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;
    



    @ManyToOne(fetch = FetchType.LAZY)
    
    @JoinColumn(name = "s_id")
    private serviceproviders serviceProvider;

    @ManyToOne(fetch = FetchType.LAZY)
   
    @JoinColumn(name = "u_id")
    private userdetails userDetails;

    private LocalDateTime bookingdatetime;
    
    @OneToOne(fetch = FetchType.LAZY)

    @JoinColumn(name = "service_id")
    private services service;

    


    private String status; // e.g., "pending", "confirmed", "cancelled"
    private String paymentStatus; // e.g., "paid", "unpaid"
    private String paymentMethod; // e.g., "credit card", "cash", etc.
    private String bookingDetails; // Additional details about the booking
    public bookings() {}
    public bookings(serviceproviders serviceProvider, LocalDateTime bookingdatetime,userdetails userDetails,services service, String status, String paymentStatus, String paymentMethod, String bookingDetails) {
        this.serviceProvider = serviceProvider;
        this.userDetails = userDetails;
        this.bookingdatetime = bookingdatetime;
        this.service = service;
        this.status = status;
        this.paymentStatus = paymentStatus;
        this.paymentMethod = paymentMethod;
        this.bookingDetails = bookingDetails;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public serviceproviders getServiceProvider() {
        return serviceProvider;
    }
    public void setServiceProvider(serviceproviders serviceProvider) {
        this.serviceProvider = serviceProvider;
    }
    public userdetails getUserDetails() {
        return userDetails;
    }
    public void setUserDetails(userdetails userDetails) {
        this.userDetails = userDetails;
    }
    

    public LocalDateTime getBookingdatetime() {
        return bookingdatetime;
    }

    public void setBookingdatetime(LocalDateTime bookingdatetime) {
        this.bookingdatetime = bookingdatetime;
    }

    public services getService() {
        return service;
    }
    public void setService(services service) {
        this.service = service;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public String getPaymentStatus() {
        return paymentStatus;
    }
    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }
    public String getPaymentMethod() {
        return paymentMethod;
    }
    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
    public String getBookingDetails() {
        return bookingDetails;
    }
    public void setBookingDetails(String bookingDetails) {
        this.bookingDetails = bookingDetails;
    }

    

    @Override
    public String toString() {
        return "bookings{" +
                "id=" + id +
                ", serviceProvider=" + serviceProvider +
                ", userDetails=" + userDetails +
                ", bookingdatetime=" + bookingdatetime +
                ", service=" + service +
                ", status='" + status + '\'' +
                ", paymentStatus='" + paymentStatus + '\'' +
                ", paymentMethod='" + paymentMethod + '\'' +
                ", bookingDetails='" + bookingDetails + '\'' +
                '}';
    }
    


}
