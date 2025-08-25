package com.setu.setu.models;

import jakarta.persistence.*;

@Entity
@Table(name = "userdetails")
public class userdetails {

    @Id
    private Long id;  // no GeneratedValue - inherited from user

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId // Maps the primary key to the user id
    @JoinColumn(name = "user_id") // foreign key column
    private user user;

    @Column(nullable = false)
    private Long phoneNumber; // Use wrapper to handle null values

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String dob;

    public userdetails() {}

    public userdetails(user user, Long phoneNumber, String address, String dob) {
        this.user = user;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.dob = dob;
    }

    // Getters and setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public user getUser() { return user; }
    public void setUser(user user) { this.user = user; }

    public Long getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(Long phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    

    public String getDob() { return dob; }
    public void setDob(String dob) { this.dob = dob; }

    public String getEmail() {
    return user != null ? user.getEmail() : null;
    }

    public void setEmail(String email) {
        if (user != null) {
            user.setEmail(email);
        }
    }


    

    @Override
    public String toString() {
        return "UserDetails{" +
                "id=" + id +
                ", user=" + (user != null ? user.getId() : null) +
                ", phoneNumber=" + phoneNumber +
                ", address='" + address + '\'' +
                ", dob=" + dob +
                '}';
    }
}
