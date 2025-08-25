package com.setu.setu.DTO;

import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

public class serviceDTO {
    private Long id;
    private String name;
    private String description;
    private List<String> imagesBase64; // Base64-encoded image strings
    private String serviceCategory;
    private double servicePrice;
    private String status;


    // Getters and Setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public void setImages(List<byte[]> images) {
        this.imagesBase64 = images.stream()
            .map(imageBytes -> Base64.getEncoder().encodeToString(imageBytes))
            .collect(Collectors.toList());
    }

    public String getstatus(){
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<String> getImagesBase64() {
        return imagesBase64;
    }
    public void setServiceCategory(String serviceCategory) {
        this.serviceCategory = serviceCategory;
    }
    public String getServiceCategory() {
        return serviceCategory;
    }
    public double getServicePrice() {
        return servicePrice;
    }
    public void setServicePrice(double servicePrice) {
        this.servicePrice = servicePrice;
    }

    
    public serviceDTO() {}
    public serviceDTO(Long id, String name, String description, List<String> imagesBase64, double servicePrice, String serviceCategory,String status) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imagesBase64 = imagesBase64;
        this.servicePrice = servicePrice;
        this.serviceCategory = serviceCategory;
        this.status = status;
    }
    @Override
    public String toString() {
        return "serviceDTO{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", imagesBase64=" + imagesBase64 +
                ", servicePrice=" + servicePrice +
                ", serviceCategory='" + serviceCategory + '\'' +
                '}';
    }


}
