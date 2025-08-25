package com.setu.setu.models;
import java.time.LocalDateTime;


import jakarta.persistence.Entity;
import jakarta.persistence.*;
import com.setu.setu.models.*;



@Entity
public class reports {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "u_id")
    private user user;

    

    private String content;
    private String status;
    private LocalDateTime createdAt;


    public reports() {}

    public reports(user user, String content, String status, LocalDateTime createdAt) {
        this.user = user;
        
        this.content = content;
        this.status = status;
        this.createdAt = createdAt;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public user getUser() {
        return user;
    }

    public void setUser(user user) {
        this.user = user;
    }


    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return "reports{" +
                "id=" + id +
                ", user=" + user +
              
                ", content='" + content + '\'' +
                ", status='" + status + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }

}
