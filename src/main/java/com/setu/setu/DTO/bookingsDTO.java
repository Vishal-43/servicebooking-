package com.setu.setu.DTO;

import java.util.List;
import com.setu.setu.models.*;

import java.time.LocalDateTime;
import java.util.Base64;



public class bookingsDTO {
    private Long id;
    private List<String> imagesBase64;
    private LocalDateTime bookingdatetime;
    private String service;
    private String status;
    private String paymentStatus;
    private String paymentMethod;
    private String bookingDetails;
    private String customerName;
    private String customerEmail;

    public bookingsDTO(){}
    public bookingsDTO(Long id, List<String> imagesBase64,LocalDateTime bookingdatetime,String service, String status, String paymentStatus, String paymentMethod, String bookingDetails, String customerName, String customerEmail) {
        this.id = id;
        this.imagesBase64 = imagesBase64;
        this.bookingdatetime = bookingdatetime;
        this.service = service;
        this.status = status;
        this.paymentStatus = paymentStatus;
        this.paymentMethod = paymentMethod;
        this.bookingDetails = bookingDetails;
        this.customerName = customerName;
        this.customerEmail = customerEmail;
    }

    // getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<String> getImagesBase64() {
        return imagesBase64;
    }

    public void setImagesBase64(List<String> imagesBase64) {
        this.imagesBase64 = imagesBase64;
    }

    public LocalDateTime getBookingdatetime() {
        return bookingdatetime;
    }

    public void setBookingdatetime(LocalDateTime bookingdatetime) {
        this.bookingdatetime = bookingdatetime;
    }

    public String getService() {
        return service;
    }

    public void setService(String service) {
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

    public String getCustomerName() {
        return customerName;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

}
