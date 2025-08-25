package com.setu.setu.models;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Id;

@Entity
public class serviceproviders {
    @Id
    private long id;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId // Maps the primary key to the user id
    @JoinColumn(name = "user_id") // foreign key column
    private user user;

     private String businessName;
    private String businessType;
    private String serviceCategory;
    private String servicesOffered;
    private String websiteUrl;
    private String licenseNumber;
    private String serviceArea;
    private String workingHours;

    // Contact Details
    private String contactName;
    private String email;
    private String contactPhoneNumber;

    // Address Details
    private String flatHouseNo;
    private String roomNo;
    private String street;
    private String area;
    private String city;
    private String state;
    private String zipCode;
    private String fullAddress;

    // Bank Details
    private String bankName;
    private String accountNumber;
    private String ifscCode;

    public serviceproviders() {}

    public serviceproviders(user user, String businessName, String businessType, String serviceCategory,
                            String servicesOffered, String websiteUrl, String licenseNumber, String serviceArea,
                            String workingHours, String contactName, String email, String contactPhoneNumber,
                            String flatHouseNo, String roomNo, String street, String area, String city,
                            String state, String zipCode, String fullAddress, String bankName,
                            String accountNumber, String ifscCode) {
        this.user = user;
        this.businessName = businessName;
        this.businessType = businessType;
        this.serviceCategory = serviceCategory;
        this.servicesOffered = servicesOffered;
        this.websiteUrl = websiteUrl;
        this.licenseNumber = licenseNumber;
        this.serviceArea = serviceArea;
        this.workingHours = workingHours;
        this.contactName = contactName;
        this.email = email;
        this.contactPhoneNumber = contactPhoneNumber;
        this.flatHouseNo = flatHouseNo;
        this.roomNo = roomNo;
        this.street = street;
        this.area = area;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
        this.fullAddress = fullAddress;
        this.bankName = bankName;
        this.accountNumber = accountNumber;
        this.ifscCode = ifscCode;
    }
    // Getters and Setters
    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public user getUser() {
        return user;
    }
    public void setUser(user user) {
        this.user = user;
    }
    public String getBusinessName() {
        return businessName;
    }
    public void setBusinessName(String businessName) {
        this.businessName = businessName;
    }
    public String getBusinessType() {
        return businessType;
    }
    public void setBusinessType(String businessType) {
        this.businessType = businessType;
    }
    public String getServiceCategory() {
        return serviceCategory;
    }
    public void setServiceCategory(String serviceCategory) {
        this.serviceCategory = serviceCategory;
    }
    public String getServicesOffered() {
        return servicesOffered;
    }
    public void setServicesOffered(String servicesOffered) {
        this.servicesOffered = servicesOffered;
    }
    public String getWebsiteUrl() {
        return websiteUrl;
    }
    public void setWebsiteUrl(String websiteUrl) {
        this.websiteUrl = websiteUrl;
    }
    public String getLicenseNumber() {
        return licenseNumber;
    }
    public void setLicenseNumber(String licenseNumber) {
        this.licenseNumber = licenseNumber;
    }
    public String getServiceArea() {
        return serviceArea;
    }
    public void setServiceArea(String serviceArea) {
        this.serviceArea = serviceArea;
    }
    public String getWorkingHours() {
        return workingHours;
    }
    public void setWorkingHours(String workingHours) {
        this.workingHours = workingHours;
    }
    public String getContactName() {
        return contactName;
    }
    public void setContactName(String contactName) {
        this.contactName = contactName;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getContactPhoneNumber() {
        return contactPhoneNumber;
    }
    public void setContactPhoneNumber(String contactPhoneNumber) {
        this.contactPhoneNumber = contactPhoneNumber;
    }
    public String getFlatHouseNo() {
        return flatHouseNo;
    }

    public void setFlatHouseNo(String flatHouseNo) {
        this.flatHouseNo = flatHouseNo;
    }

    public String getRoomNo() {
        return roomNo;
    }
    public void setRoomNo(String roomNo) {
        this.roomNo = roomNo;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getCity() {
        return city;
    }


    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }
    public void setState(String state) {
        this.state = state;
    }
    public String getZipCode() {
        return zipCode;
    }
    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }
    public String getFullAddress() {
        return fullAddress;
    }
    public void setFullAddress(String fullAddress) {
        this.fullAddress = fullAddress;
    }
    public String getBankName() {
        return bankName;
    }
    public void setBankName(String bankName) {
        this.bankName = bankName;
    }
    public String getAccountNumber() {
        return accountNumber;
    }
    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }
    public String getIfscCode() {
        return ifscCode;
    }

    public void setIfscCode(String ifscCode) {
        this.ifscCode = ifscCode;
    }
    @Override
    public String toString() {
        return "ServiceProviders{" +
                "id=" + id +
                ", user=" + (user != null ? user.getId() : null) +
                ", businessName='" + businessName + '\'' +
                ", businessType='" + businessType + '\'' +
                ", serviceCategory='" + serviceCategory + '\'' +
                ", servicesOffered='" + servicesOffered + '\'' +
                ", websiteUrl='" + websiteUrl + '\'' +
                ", licenseNumber='" + licenseNumber + '\'' +
                ", serviceArea='" + serviceArea + '\'' +
                ", workingHours='" + workingHours + '\'' +
                ", contactName='" + contactName + '\'' +
                ", email='" + email + '\'' +
                ", contactPhoneNumber='" + contactPhoneNumber + '\'' +
                ", flatHouseNo='" + flatHouseNo + '\'' +
                ", roomNo='" + roomNo + '\'' +
                ", street='" + street + '\'' +
                ", area='" + area + '\'' +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                ", zipCode='" + zipCode + '\'' +
                ", fullAddress='" + fullAddress + '\'' +
                ", bankName='" + bankName + '\'' +
                ", accountNumber='" + accountNumber + '\'' +
                ", ifscCode='" + ifscCode + '\'' +
                '}';
    }
    


    

}
