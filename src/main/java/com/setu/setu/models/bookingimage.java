package com.setu.setu.models;

import jakarta.persistence.Entity;
import jakarta.persistence.*;

@Entity
public class bookingimage{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id")
    private bookings booking ;

    @Lob
    private byte[] imageData;

// Constructors, getters, and setters

    public bookingimage() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public bookings getBooking() {
        return booking;
    }

    public void setBooking(bookings booking) {
        this.booking = booking;
    }

    public byte[] getImageData() {
        return imageData;
    }

    public void setImageData(byte[] imageData) {
        this.imageData = imageData;
    }   
}