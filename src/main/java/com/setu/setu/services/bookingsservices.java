package com.setu.setu.services;

import org.springframework.stereotype.Service;

import com.setu.setu.config.UserNotFoundException;
import com.setu.setu.models.*;

import com.setu.setu.reposoratory.*;

import java.util.Base64;
import java.util.List;
// import jakarta.persistence.*;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import java.util.Optional;
import java.time.LocalDateTime;


@Service
public class bookingsservices {
    private final UserRepository UserRepository;
    private final userdetailreposiraotry userDetailRepository;
	private final bookingsreposiratory bookingRepository;
	private final serviceprovidersreposiratory serviceProviderRepository;
	private final bookingimagereposiraotry bookingImageRepository;
    private final servicereposiratory serviceRepository;

    public bookingsservices(UserRepository userRepository, userdetailreposiraotry userDetailRepository, bookingsreposiratory bookingRepository, serviceprovidersreposiratory serviceProviderRepository, bookingimagereposiraotry bookingImageRepository, servicereposiratory serviceRepository) {
        this.UserRepository = userRepository;
        this.userDetailRepository = userDetailRepository;
        this.bookingRepository = bookingRepository;
        this.serviceProviderRepository = serviceProviderRepository;
        this.bookingImageRepository = bookingImageRepository;
        this.serviceRepository = serviceRepository;
    }

    public ResponseEntity<?> bookService(Map<String, Object> request) {
       String email = (String) request.get("userEmail");
       
       Object serviceIdObj = request.get("serviceId");
Long serviceId = null;
if (serviceIdObj instanceof Integer) {
    serviceId = ((Integer) serviceIdObj).longValue();
} else if (serviceIdObj instanceof Long) {
    serviceId = (Long) serviceIdObj;
}


       user user = UserRepository.findByEmail(email);
       if(user == null){
        throw new UserNotFoundException();
        }

        Long Id = user.getId();
        userdetails userd = userDetailRepository.findByUserId(Id);

        if(userd == null){
            return ResponseEntity.badRequest().body("are you service provider?");
        }

       Optional<services> service = serviceRepository.findById(serviceId);
       if(service.isEmpty()){
        return ResponseEntity.badRequest().body("Service not found");

       }

       serviceproviders serviceprovider = serviceProviderRepository.findByUserId(service.get().getServiceProvider().getId());
       if(serviceprovider == null){
        return ResponseEntity.badRequest().body("Service provider not found");

       }

       bookings newbooking = new bookings();
       newbooking.setUserDetails(userd);
       newbooking.setService(service.get());
       newbooking.setServiceProvider(serviceprovider);
       newbooking.setStatus("pending");
       newbooking.setBookingdatetime(LocalDateTime.now());
       newbooking.setPaymentStatus("pending");
       bookingRepository.save(newbooking);


       Object imagesObj = request.get("images");
if (imagesObj instanceof List<?>) {
    List<?> imagesList = (List<?>) imagesObj;
    for (Object imgObj : imagesList) {
        if (imgObj instanceof String) {
            String base64 = (String) imgObj;
            // Remove data URL prefix if present
            if (base64.startsWith("data:")) {
                base64 = base64.substring(base64.indexOf(",") + 1);
            }
            if (!base64.isEmpty()) {
                byte[] bytes = Base64.getDecoder().decode(base64);
                bookingimage image = new bookingimage();
                image.setImageData(bytes);
                image.setBooking(newbooking);
                bookingImageRepository.save(image);
            }
        }
    }
}
       
       return ResponseEntity.ok(newbooking);

 }
}
