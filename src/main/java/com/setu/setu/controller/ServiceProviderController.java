package com.setu.setu.controller;

import org.springframework.web.bind.annotation.RestController;

import com.setu.setu.controller.Authcontroller.ApiResponse;
import com.setu.setu.models.*;
import com.setu.setu.reposoratory.bookingsreposiratory;
import com.setu.setu.reposoratory.reviewsreposiratory;
import com.setu.setu.reposoratory.serviceprovidersreposiratory;
import com.setu.setu.reposoratory.servicereposiratory;

import org.springframework.web.bind.annotation.RequestMapping;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import com.setu.setu.reposoratory.ServiceImageRepository;
import com.setu.setu.reposoratory.UserRepository;
import com.setu.setu.reposoratory.bookingimagereposiraotry;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import com.setu.setu.DTO.*;
import java.time.LocalDateTime;
import com.setu.setu.services.*;




@RestController
@RequestMapping("/api/service-provider")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ServiceProviderController {
	@Autowired
	private serviceprovidersreposiratory serviceprovidersreposiratory;

	@Autowired
	private bookingsreposiratory bookingsreposiratory;

	@Autowired
	private reviewsreposiratory reviewsreposiratory;

	@Autowired
	private servicereposiratory servicereposiratory;
	
	@Autowired
	private ServiceImageRepository serviceImageRepo;

    @Autowired 
    private bookingimagereposiraotry bookingimagereposiraotry;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private reportservices reportservices;

	@PostMapping("/home")
	public ResponseEntity<?> postMethodhome(@RequestBody Map<String, Object> request) {
		String email  = (String) request.get("email");
		serviceproviders provider = serviceprovidersreposiratory.findByEmail(email);
		if (provider == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");

		}

		long id = provider.getId();
		List<bookings> bookings = bookingsreposiratory.findByServiceProvider_Id(id);
		List<reviews> reviews = reviewsreposiratory.findByServiceProvider_Id(id);
		List<services> services = servicereposiratory.findByServiceProvider_Id(id);
		List<bookings> pendingbookings = bookings.stream()
			.filter(b -> "pending".equalsIgnoreCase(b.getStatus()))
			.toList();
		List<bookings> completedbookings = bookings.stream()
			.filter(b-> "completed".equalsIgnoreCase(b.getStatus()))
			.toList();

		int pendingCount = pendingbookings.size();
		int completedCount = completedbookings.size();
		int serviceCount = services.size();

		double averageRating = reviews.stream()
			.mapToDouble(rev -> rev.getRating())
			.average()
			.orElse(0.0);

		serviceproviderresponce responce = new serviceproviderresponce(true,pendingCount, completedCount, serviceCount, averageRating);

      
		 

		return ResponseEntity.ok(responce);
	}



	@PostMapping("/services")
	public ResponseEntity<?> postMethodservices(@RequestBody Map<String, Object> request) {
		String email = (String) request.get("email");
		serviceproviders provider = serviceprovidersreposiratory.findByEmail(email);
		if (provider == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
		}
		long id = provider.getId();
		List<services> services = servicereposiratory.findByServiceProvider_Id(id);
		
		if (services.isEmpty()) {
			return ResponseEntity.ok(services);
		}
		List<com.setu.setu.DTO.serviceDTO> serviceDTOs = services.stream()
			.map(service -> {
				List<ServiceImage> serviceImages = serviceImageRepo.findByService_id(service.getId());
				return new com.setu.setu.DTO.serviceDTO(
					service.getId(),
					service.getServiceName(),
					service.getServiceDescription(),
					serviceImages.stream()
						.map(img -> Base64.getEncoder().encodeToString(img.getImageData()))
						.collect(Collectors.toList()),
					service.getServicePrice(),
					service.getServiceCategory(),
					service.getStatus()
				);
			})
			.toList();

		return ResponseEntity.ok(serviceDTOs);
	}

	@PostMapping("/add")
public ResponseEntity<?> postMethodadd(@RequestBody Map<String, Object> entity) {
    String email = (String) entity.get("email");

    serviceproviders provider = serviceprovidersreposiratory.findByEmail(email);
    if (provider == null) {
        return ResponseEntity.badRequest().body(new ApiResponse(false, "Service provider not found"));
    }

    String serviceName = (String) entity.get("name");
    String description = (String) entity.get("description");
    String category = (String) entity.get("category");
    String status = (String) entity.get("status");
    Object priceObj = entity.get("price");

    if (serviceName == null || serviceName.isEmpty()) {
        return ResponseEntity.badRequest().body(new ApiResponse(false, "Service name is required"));
    }
    if (description == null || description.isEmpty()) {
        return ResponseEntity.badRequest().body(new ApiResponse(false, "Service description is required"));
    }
    if (category == null || category.isEmpty()) {
        return ResponseEntity.badRequest().body(new ApiResponse(false, "Service category is required"));
    }

    Double servicePrice = null;

    if (priceObj instanceof Number) {
        servicePrice = ((Number) priceObj).doubleValue();
    } else if (priceObj instanceof String) {
        try {
            servicePrice = Double.parseDouble((String) priceObj);
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, "Invalid service price"));
        }
    } else {
        return ResponseEntity.badRequest().body(new ApiResponse(false, "Service price is required"));
    }

    services newService = new services();
    newService.setServiceName(serviceName);
    newService.setServiceDescription(description);
    newService.setServiceCategory(category);
    newService.setStatus(status);
    newService.setServicePrice(servicePrice);
    newService.setServiceProvider(provider);

    newService = servicereposiratory.save(newService);

   Object imagesObj = entity.get("images");
if (imagesObj instanceof List<?>) {
    List<?> imagesList = (List<?>) imagesObj;
    for (Object imgObj : imagesList) {
        if (imgObj instanceof String) {
            String base64 = (String) imgObj;
            if (base64.startsWith("data:")) {
                base64 = base64.substring(base64.indexOf(",") + 1);
            }
            if (!base64.isEmpty()) {
                byte[] bytes = Base64.getDecoder().decode(base64);
                ServiceImage image = new ServiceImage();
                image.setImageData(bytes);
                image.setService(newService); 
                serviceImageRepo.save(image);
            }
        }
    }
}


    return ResponseEntity.ok(new ApiResponse(true, "Service added successfully"));
}


@PutMapping("/edit")
    public ResponseEntity<?> postMethodName(@RequestBody Map<String, Object> entity) {

        Long id = null;
        Object idObj = entity.get("id");
        if (idObj instanceof Number) {
            id = ((Number) idObj).longValue();
        } else if (idObj instanceof String) {
            try {
                id = Long.parseLong((String) idObj);
            } catch (NumberFormatException e) {
                return ResponseEntity.badRequest().body(new ApiResponse(false, "Invalid service id"));
            }
        } else {
            return ResponseEntity.badRequest().body(new ApiResponse(false, "Service id is required"));
        }

        Optional<services> service = servicereposiratory.findById(id);
        if (!service.isPresent()) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, "Service not found"));
        }
        Double servicePrice = null;
        Object priceObj = entity.get("price");
        if (priceObj instanceof Number) {
            servicePrice = ((Number) priceObj).doubleValue();
        } else if (priceObj instanceof String) {
            try {
                servicePrice = Double.parseDouble((String) priceObj);
            } catch (NumberFormatException e) {
                return ResponseEntity.badRequest().body(new ApiResponse(false, "Invalid service price"));
            }
        } else {
            return ResponseEntity.badRequest().body(new ApiResponse(false, "Service price is required"));
        }
     
        services existingService = service.get();
        existingService.setServiceName((String) entity.get("name"));
        existingService.setServiceDescription((String) entity.get("description"));
        existingService.setServiceCategory((String) entity.get("category"));
        existingService.setStatus((String) entity.get("status"));
        existingService.setServicePrice(servicePrice);

        servicereposiratory.save(existingService);

        Object imagesObj = entity.get("images");
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
                ServiceImage image = new ServiceImage();
                image.setImageData(bytes);
                image.setService(existingService); 
                serviceImageRepo.save(image);
            }
        }
    }
}
        return ResponseEntity.ok(new ApiResponse(true, "done"));
    }

    @DeleteMapping("/delete")
    @Transactional
    public ResponseEntity<?> postMethoddelete(@RequestBody Map<String, Object> entity){
       Long id = null;
        Object idObj = entity.get("id");
        if (idObj instanceof Number) {
            id = ((Number) idObj).longValue();
        } else if (idObj instanceof String) {
            try {
                id = Long.parseLong((String) idObj);
            } catch (NumberFormatException e) {
                return ResponseEntity.badRequest().body(new ApiResponse(false, "Invalid service id"));
            }
        } else {
            return ResponseEntity.badRequest().body(new ApiResponse(false, "Service id is required"));
        }

        Optional<services> service = servicereposiratory.findById(id);
        if (!service.isPresent()) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, "Service not found"));
        }
        serviceImageRepo.deleteByService_id(id);
        servicereposiratory.deleteById(id);
        
        return ResponseEntity.ok(new ApiResponse(true, "Service deleted successfully"));
    }

    @PatchMapping("/status")
    @Transactional
    public ResponseEntity<?> postMethodstatus(@RequestBody Map<String, Object> entity){ {
        
        Long id = null;
        Object idObj = entity.get("id");
        if (idObj instanceof Number) {
            id = ((Number) idObj).longValue();
        } else if (idObj instanceof String) {
            try {
                id = Long.parseLong((String) idObj);
            } catch (NumberFormatException e) {
                return ResponseEntity.badRequest().body(new ApiResponse(false, "Invalid service id"));
            }
        } else {
            return ResponseEntity.badRequest().body(new ApiResponse(false, "Service id is required"));
        }

        Optional<services> service = servicereposiratory.findById(id);
        if (!service.isPresent()) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, "Service not found"));
        }

        services existingService = service.get();
        existingService.setStatus((String) entity.get("status"));
        servicereposiratory.save(existingService);






        return ResponseEntity.ok(new ApiResponse(true, "Service status updated successfully"));
    }

}


    @PostMapping("/bookings")
    
        public ResponseEntity<?> postMethodbooking(@RequestBody Map<String, Object> entity){
        String email = (String) entity.get("email");
        serviceproviders provider = serviceprovidersreposiratory.findByEmail(email);
        if(provider == null){
            return ResponseEntity.badRequest().body(new ApiResponse(false, "Service provider not found"));
        }

        List<bookings> bookings = bookingsreposiratory.findByServiceProvider(provider);
        if(bookings.isEmpty()){
            return ResponseEntity.badRequest().body(new ApiResponse(false, "No bookings found for this service provider"));
        }
        


        List<bookingsDTO> bookingdto = bookings.stream()
			.map(booking -> {
				Long uid = (Long) booking.getUserDetails().getId();
				Optional<user> user = userRepository.findById(uid);
				if(user.isEmpty()){
					return null;
				}
				List<bookingimage> bookingimages = bookingimagereposiraotry.findByBooking_id(booking.getId());
				return new bookingsDTO(
					booking.getId(),
                    bookingimages.stream()
						.map(img -> Base64.getEncoder().encodeToString(img.getImageData()))
						.collect(Collectors.toList()),
					booking.getBookingdatetime(),
					booking.getService().getServiceName(),
					booking.getStatus(),
					booking.getPaymentStatus(),
					booking.getPaymentMethod(),
					booking.getBookingDetails(),
                    user.get().getFullName(),
                    user.get().getEmail()
                    );
			})
			.toList();
       

        return ResponseEntity.ok(bookingdto);
    }

    @PatchMapping("/orders/status")
    @Transactional
        public ResponseEntity<?> postMethodorderstatus(@RequestBody Map<String, Object> entity){
            
            String status = (String) entity.get("status");
            Long id = null;
            Object idObj = entity.get("id");
            if (idObj instanceof Number) {
                id = ((Number) idObj).longValue();
            } else if (idObj instanceof String) {
                try {
                    id = Long.parseLong((String) idObj);
                } catch (NumberFormatException e) {
                    return ResponseEntity.badRequest().body(new ApiResponse(false, "Invalid service id"));
                }
            } else {
                return ResponseEntity.badRequest().body(new ApiResponse(false, "Service id is required"));
            }

            Optional<bookings> booking = bookingsreposiratory.findById(id);

            if(booking.isEmpty()){
                return ResponseEntity.badRequest().body(new ApiResponse(false, "Booking not found"));

            }

            bookings existingbookings = booking.get();
            existingbookings.setStatus(status);
            bookingsreposiratory.save(existingbookings);




            return ResponseEntity.ok(new ApiResponse(true, "Order status updated successfully"));

        }

    @PatchMapping("/orders/payment-status")
    @Transactional
        public ResponseEntity<?> postMethodpaymentstatus(@RequestBody Map<String, Object> entity){
            
            String status = (String) entity.get("paymentStatus");
            Long id = null;
            Object idObj = entity.get("id");
            if (idObj instanceof Number) {
                id = ((Number) idObj).longValue();
            } else if (idObj instanceof String) {
                try {
                    id = Long.parseLong((String) idObj);
                } catch (NumberFormatException e) {
                    return ResponseEntity.badRequest().body(new ApiResponse(false, "Invalid service id"));
                }
            } else {
                return ResponseEntity.badRequest().body(new ApiResponse(false, "order id is required"));
            }

            Optional<bookings> booking = bookingsreposiratory.findById(id);

            if(booking.isEmpty()){
                return ResponseEntity.badRequest().body(new ApiResponse(false, "Booking not found"));

            }

            bookings existingbookings = booking.get();
            existingbookings.setPaymentStatus(status);
            bookingsreposiratory.save(existingbookings);




            return ResponseEntity.ok(new ApiResponse(true, "Order status updated successfully"));

        }

    @PostMapping("/reviews")
        public ResponseEntity<?> postMethodreviews(@RequestBody  Map<String, Object> entity) {

            String email = (String) entity.get("email");
            serviceproviders provider = serviceprovidersreposiratory.findByEmail(email);
            if (provider == null) {
                return ResponseEntity.badRequest().body(new ApiResponse(false, "Details not found "));
            }
            long id = provider.getId();
            List<reviews> reviews = reviewsreposiratory.findByServiceProvider_Id(id);

            List<reviewsDTO> reviewsDTOList = reviews.stream().map(review -> new reviewsDTO(
                    review.getId(),
                    review.getRating(),
                    review.getComment()
            )).collect(Collectors.toList());

            return ResponseEntity.ok(reviewsDTOList);
        }
        

    @PostMapping("/reports")
        public ResponseEntity<?> postMethodreport(@RequestBody  Map<String, Object> entity) {
            return ResponseEntity.ok(reportservices.getreportsbyemail(entity.get("email").toString()));
    }

    @PostMapping("/reports/add")
        public ResponseEntity<?> postmethodaddreport(@RequestBody Map<String, Object> entity) {
            return reportservices.addreport(entity);
        }
    

}


