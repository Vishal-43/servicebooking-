package com.setu.setu.models;
import jakarta.persistence.*;

@Entity
public class ServiceImage {
  
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "service_id")
    private services service;

    @Lob
    private byte[] imageData;

    // Getters and setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public services getService() { return service; }
    public void setService(services service) { this.service = service; }

    public byte[] getImageData() { return imageData; }
    public void setImageData(byte[] imageData) { this.imageData = imageData; }
}

