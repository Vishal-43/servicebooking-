package com.setu.setu.DTO;

public class loginresponce {
    private boolean success;
    private String message;
    private Long userId;
    private String email;
    private Boolean details;
    private String name;
    

    public loginresponce(boolean success, String message, Long userId, String email,boolean details,String name) {
        this.success = success;
        this.details = details;
        this.message = message;
        this.name = name;
        this.userId = userId;
        this.email = email;
    }

    public boolean isSuccess() {
        return success;
    }
    public void setSuccess(boolean success) {
        this.success = success;
    }
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    public Long getUserId() {
        return userId;
    }
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public Boolean getDetails() {
        return details;
    }
    public void setDetails(Boolean details) {
        this.details = details;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
}
