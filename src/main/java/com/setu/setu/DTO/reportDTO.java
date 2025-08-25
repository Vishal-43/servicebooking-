package com.setu.setu.DTO;

import java.time.LocalDateTime;
public class reportDTO {
    private Long id;
    private String content;
    private String status;
    private LocalDateTime createdAt;

    public reportDTO() {}

    public reportDTO(Long id, String content, String status, LocalDateTime createdAt) {
        this.id = id;
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
}
