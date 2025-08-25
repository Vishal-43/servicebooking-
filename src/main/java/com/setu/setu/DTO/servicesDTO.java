package com.setu.setu.DTO;

import java.util.List;

public class servicesDTO {
  private Long id;
    private String name;
    private String description;
    private List<String> imagesBase64; // Base64-encoded image strings
    private String serviceCategory;
    private double servicePrice;
   
   

    public String getServiceCategory() {
        return serviceCategory;
    }

    public void setServiceCategory(String serviceCategory) {
        this.serviceCategory = serviceCategory;
    }

    public double getServicePrice() {
        return servicePrice;
    }

    public void setServicePrice(double servicePrice) {
        this.servicePrice = servicePrice;
    }

    public List<String> getImagesBase64() {
        return imagesBase64;
    }

    public void setImagesBase64(List<String> imagesBase64) {
        this.imagesBase64 = imagesBase64;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setName(String name) {
        this.name = name;
    }

    public servicesDTO(Long id, String name, String description, List<String> imagesBase64, double servicePrice, String serviceCategory) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imagesBase64 = imagesBase64;
        this.servicePrice = servicePrice;
        this.serviceCategory = serviceCategory;
    }

    public servicesDTO() {  }


}
