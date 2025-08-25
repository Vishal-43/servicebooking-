package com.setu.setu.DTO;

public class serviceproviderresponce {
    private boolean success;
    private int pendingCount;
    private int completedCount;
    private int serviceCount;
    private double averageRating;

    public serviceproviderresponce(boolean success, int pendingCount, int completedCount, int serviceCount, double averageRating) {
        this.success = success;
        this.pendingCount = pendingCount;
        this.completedCount = completedCount;
        this.serviceCount = serviceCount;
        this.averageRating = averageRating;
    }

    public boolean isSuccess() {
        return success;
    }

    public int getPendingCount() {
        return pendingCount;
    }

    public int getCompletedCount() {
        return completedCount;
    }

    public int getServiceCount() {
        return serviceCount;
    }

    public double getAverageRating() {
        return averageRating;
    }   

    public void setSuccess(boolean success) {
        this.success = success;
    }
    public void setPendingCount(int pendingCount) {
        this.pendingCount = pendingCount;
    }
    public void setCompletedCount(int completedCount) {
        this.completedCount = completedCount;
    }
    public void setServiceCount(int serviceCount) {
        this.serviceCount = serviceCount;
    }
    public void setAverageRating(double averageRating) {
        this.averageRating = averageRating;
    }
    @Override
    public String toString() {
        return "serviceproviderresponce{" +
                "success=" + success +
                ", pendingCount=" + pendingCount +
                ", completedCount=" + completedCount +
                ", serviceCount=" + serviceCount +
                ", averageRating=" + serviceCount +
                '}';
    }

}
