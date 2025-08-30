package com.setu.setu.models;

import org.hibernate.annotations.ManyToAny;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;


@Entity
public class services {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "s_id")
    private serviceproviders serviceProvider;
    private String serviceName;
    private String serviceDescription;
    private double servicePrice;
    private String status;

    private String serviceCategory;

    public services() {}
    public services(serviceproviders serviceProvider, String serviceName, String serviceDescription, double servicePrice,  String serviceCategory, String status) {
        this.serviceProvider = serviceProvider;
        this.serviceName = serviceName;
        this.serviceDescription = serviceDescription;
        this.servicePrice = servicePrice;
        
        this.serviceCategory = serviceCategory;
        this.status = status;
        this.serviceCategory = serviceCategory;
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
    public String getServiceName() {
        return serviceName;
    }
    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }
    public String getServiceDescription() {
        return serviceDescription;
    }
    public void setServiceDescription(String serviceDescription) {
        this.serviceDescription = serviceDescription;
    }
    public double getServicePrice() {
        return servicePrice;
    }
    public void setServicePrice(double servicePrice) {
        this.servicePrice = servicePrice;
    }
    
    public String getServiceCategory() {
        return serviceCategory;
    }
    public void setServiceCategory(String serviceCategory) {
        this.serviceCategory = serviceCategory;
    }

    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    @Override
    public String toString() {
        return "services{" +
                "id=" + id +
                ", serviceProvider=" + serviceProvider +
                ", serviceName='" + serviceName + '\'' +
                ", serviceDescription='" + serviceDescription + '\'' +
                ", servicePrice=" + servicePrice +
                
                ", serviceCategory='" + serviceCategory + '\'' +
                '}';
    }
    



}
