package com.setu.setu.controller;

import com.setu.setu.models.user;
import com.setu.setu.models.userdetails;
import com.setu.setu.reposoratory.userdetailreposiraotry;
import com.setu.setu.reposoratory.UserRepository;
import com.setu.setu.models.serviceproviders;
import com.setu.setu.reposoratory.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;


import java.util.Optional;
import java.util.Map;
import com.setu.setu.DTO.loginresponce;



@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true") 
public class Authcontroller {

    @Autowired
    private UserRepository userRepository;

   
    @Autowired
    private userdetailreposiraotry userdetailsreposiratory;

    @Autowired
    private serviceprovidersreposiratory serviceprovidersrepository;

    @Autowired
    private org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody user user) {

    if (user.getEmail() == null || user.getPassword() == null || user.getFullName() == null) {
        return ResponseEntity
            .badRequest()
            .body(new ApiResponse(false, "All fields are required"));
    }

    Optional<user> existingUser = Optional.ofNullable(userRepository.findByEmail(user.getEmail()));
    if (existingUser.isPresent()) {
        return ResponseEntity
            .badRequest()
            .body(new ApiResponse(false, "Email already registered"));
    }

    // Hash the password before storing
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    user.setType("none");
    userRepository.save(user);

    return ResponseEntity.ok(new ApiResponse(true, "User registered successfully"));
}


    @PostMapping("/login")
    public ResponseEntity<?> Login(@RequestBody user LoginUser){
        if (LoginUser.getEmail()==null || LoginUser.getPassword() == null ){
            return ResponseEntity
                .badRequest()
                .body(new ApiResponse(false, "Email and password are required"));

        }else if (LoginUser.getEmail() != null && LoginUser.getPassword() != null) {
      
            Optional<user> existingUser = Optional.ofNullable(userRepository.findByEmail(LoginUser.getEmail()));
            
            if (existingUser.isPresent() && passwordEncoder.matches(LoginUser.getPassword(), existingUser.get().getPassword())) {

                user user = userRepository.findByEmail(existingUser.get().getEmail());
                String name = user.getFullName();
                if(user.getType().equals("user")) {
                    return ResponseEntity.ok(new loginresponce(true, "Login successful", existingUser.get().getId(), existingUser.get().getEmail(), false,name, existingUser.get().getType()));
                }

                if(user.getType().equals("service_provider")) {
                    return ResponseEntity.ok(new loginresponce(true, "Login successful", existingUser.get().getId(), existingUser.get().getEmail(), false,name, existingUser.get().getType()));
                }

                if(user.getType().equals("admin")) {
                    return ResponseEntity.ok(new loginresponce(true, "Login successful", existingUser.get().getId(), existingUser.get().getEmail(), true,name, existingUser.get().getType()));
                }

                if(user.getType().equals("none")) {
                    return ResponseEntity.ok(new loginresponce(true, "Login successful", existingUser.get().getId(), existingUser.get().getEmail(), true,name, existingUser.get().getType()));
                }
            } else {
                return ResponseEntity
                    .badRequest()
                    .body(new ApiResponse(false, "Invalid email or password"));
            }

            
        }

        return ResponseEntity
            .badRequest()
            .body(new ApiResponse(false, "Invalid login request"));
    }


   @PostMapping("/profile-completion")
public ResponseEntity<?> completeProfile(@RequestBody Map<String, Object> request) {
  
   

    String email = (String) request.get("email");
   

    if (email == null || email.isEmpty()) {
        return ResponseEntity.badRequest().body(new ApiResponse(false, "Email not provided"));
    }

    user userEntity = userRepository.findByEmail(email);
    if (userEntity == null) {
        return ResponseEntity.badRequest().body(new ApiResponse(false, "User not found"));
    }

    
    String dob = (String) request.get("dob");
    
    Long phoneNumber = null;

    try {
        phoneNumber = request.get("phoneNumber") != null ? Long.parseLong(request.get("phoneNumber").toString()) : null;
    } catch (NumberFormatException e) {
        return ResponseEntity.badRequest().body(new ApiResponse(false, "Invalid phone number format"));
    }

    Object addrObj = request.get("addressDetails");
    final Map<String, String> addrMap;
    if (addrObj instanceof Map<?, ?>) {
        addrMap = new java.util.HashMap<>();
        ((Map<?, ?>) addrObj).forEach((k, v) -> {
            if (k instanceof String && v instanceof String) {
                addrMap.put((String) k, (String) v);
            }
        });
    } else {
        addrMap = null;
    }
    String address = null;
    if (addrMap != null) {
        address = String.join(", ",
            Optional.ofNullable(addrMap.get("flatHouseNo")).orElse(""),
            addrMap.containsKey("roomNo") && addrMap.get("roomNo")!=null ? "Room " + addrMap.get("roomNo") : "",
            Optional.ofNullable(addrMap.get("street")).orElse(""),
            Optional.ofNullable(addrMap.get("area")).orElse(""),
            Optional.ofNullable(addrMap.get("city")).orElse(""),
            Optional.ofNullable(addrMap.get("state")).orElse(""),
            Optional.ofNullable(addrMap.get("zipCode")).orElse("")
        ).replaceAll(", +", ", ").trim();
    } else {
        address = (String) request.get("address");
    }

    
    userdetails details = new userdetails();
    details.setUser(userEntity);
    details.setPhoneNumber(phoneNumber);
    details.setDob(dob);
    details.setAddress(address);

    userdetailsreposiratory.save(details);

    userEntity.setType("user");
    userRepository.save(userEntity);

    return ResponseEntity.ok(details);
}

@PostMapping("provider-registration")
public ResponseEntity<?> postMethodName(@RequestBody Map<String, Object> request) {
    
    String email = (String) request.get("email");
  

    
    user userEntity = userRepository.findByEmail(email);
    if (userEntity == null) {
        return ResponseEntity.badRequest().body(new ApiResponse(false, "User not found "));
    }

    Long contactPhoneNumber = null;
    try {
        contactPhoneNumber = request.get("phoneNumber") != null ? Long.parseLong(request.get("phoneNumber").toString()) : null;
    } catch (NumberFormatException e) {
        return ResponseEntity.badRequest().body(new ApiResponse(false, "Invalid phone number format"));
    }

    Object addrObj = request.get("addressDetails");
    final Map<String, String> addrMap;
    if (addrObj instanceof Map<?, ?>) {
        addrMap = new java.util.HashMap<>();
        ((Map<?, ?>) addrObj).forEach((k, v) -> {
            if (k instanceof String && v instanceof String) {
                addrMap.put((String) k, (String) v);
            }
        });
    } else {
        addrMap = null;
    }
    String address = null;
    if (addrMap != null) {
        address = String.join(", ",
            Optional.ofNullable(addrMap.get("flatHouseNo")).orElse(""),
            addrMap.containsKey("roomNo") && addrMap.get("roomNo")!=null ? "Room " + addrMap.get("roomNo") : "",
            Optional.ofNullable(addrMap.get("street")).orElse(""),
            Optional.ofNullable(addrMap.get("area")).orElse(""),
            Optional.ofNullable(addrMap.get("city")).orElse(""),
            Optional.ofNullable(addrMap.get("state")).orElse(""),
            Optional.ofNullable(addrMap.get("zipCode")).orElse("")
        ).replaceAll(", +", ", ").trim();
    } else {
        address = (String) request.get("fullAddress"); 
    }


    Object bankobj = request.get("bankDetails");
    final Map<String, String> bankMap;
    if (bankobj instanceof Map<?, ?>) {
        bankMap = new java.util.HashMap<>();
        ((Map<?, ?>) bankobj).forEach((k, v) -> {
            if (k instanceof String && v instanceof String) {
                bankMap.put((String) k, (String) v);
            }
        });
    } else {
        bankMap = null;
    }
    String bank = null;

    if (bankMap != null) {
        bank = String.join(", ",
            Optional.ofNullable(bankMap.get("accountNumber")).orElse(""),
            Optional.ofNullable(bankMap.get("ifscCode")).orElse(""),
            Optional.ofNullable(bankMap.get("bankName")).orElse(""),
            Optional.ofNullable(bankMap.get("branchName")).orElse("")
        ).replaceAll(", +", ", ").trim();
    }

    Object buisnessObject = request.get("businessDetails");
    final Map<String,String> buisnessMap;
    if (buisnessObject instanceof Map<?,?>){
        buisnessMap = new java.util.HashMap<>();
        ((Map<?, ?>) buisnessObject).forEach((k, v) -> {
            if (k instanceof String && v instanceof String) {
                buisnessMap.put((String) k, (String) v);
            }
        });
    } else {
        buisnessMap = null;
    }


    Object contactObj = request.get("contactDetails");
    final Map<String, String> contactMap;
    if (contactObj instanceof Map<?, ?>) {
        contactMap = new java.util.HashMap<>();
        ((Map<?, ?>) contactObj).forEach((k, v) -> {
            if (k instanceof String && v instanceof String) {
                contactMap.put((String) k, (String) v);
            }
        });
    } else {
        contactMap = null;
    }
    String contact = null;
    if (contactMap != null) {
        contact = String.join(", ",
            Optional.ofNullable(contactMap.get("contactName")).orElse(""),
            Optional.ofNullable(contactMap.get("email")).orElse(""),
            Optional.ofNullable(contactMap.get("contactPhoneNumber")).orElse("")
        ).replaceAll(", +", ", ").trim();
    }else {
        contact = (String) request.get("contactDetails"); 
    }

    
    serviceproviders serviceProvider = new serviceproviders();
    serviceProvider.setUser(userEntity);
    serviceProvider.setBusinessName((String) buisnessMap.get("businessName"));
    serviceProvider.setBusinessType((String) buisnessMap.get("businessType"));
    serviceProvider.setServiceCategory((String) buisnessMap.get("serviceCategory"));
    serviceProvider.setServicesOffered((String) buisnessMap.get("servicesOffered"));
    serviceProvider.setWebsiteUrl((String) buisnessMap.get("websiteUrl"));
    serviceProvider.setServiceArea((String) buisnessMap.get("serviceArea"));
    serviceProvider.setWorkingHours((String) buisnessMap.get("workingHours"));
    serviceProvider.setContactName(contactMap.get("contactName"));
    serviceProvider.setEmail(contactMap.get("email"));
    serviceProvider.setContactPhoneNumber(contactPhoneNumber != null ? contactPhoneNumber.toString() : null);
    serviceProvider.setLicenseNumber((String) buisnessMap.get("licenseNumber"));
    serviceProvider.setFlatHouseNo((String) addrMap.get("flatHouseNo"));
    serviceProvider.setRoomNo((String) addrMap.get("roomNo"));
    serviceProvider.setStreet((String) addrMap.get("street"));
    serviceProvider.setArea((String) addrMap.get("area"));
    serviceProvider.setCity((String) addrMap.get("city"));
    serviceProvider.setState((String) addrMap.get("state"));
    serviceProvider.setZipCode((String) addrMap.get("zipCode"));
    serviceProvider.setFullAddress((String) addrMap.get("fullAddress"));
    serviceProvider.setBankName(bankMap != null ? bankMap.get("bankName") : null);
    serviceProvider.setAccountNumber(bankMap != null ? bankMap.get("accountNumber") : null);
    serviceProvider.setIfscCode(bankMap != null ? bankMap.get("ifscCode") : null);

    
    serviceproviders serviceProviderEntity = serviceprovidersrepository.save(serviceProvider);
    if (serviceProviderEntity == null) {
        return ResponseEntity
            .badRequest()
            .body(new ApiResponse(false, "Failed to save service provider details"));
    }
    userEntity.setType("service_provider");
    userRepository.save(userEntity);

    return ResponseEntity.ok(request);
}

    

    
    public static class ApiResponse {
        private boolean success;
        private String message;

        public ApiResponse(boolean success, String message) {
            this.success = success;
            this.message = message;
        }

        public boolean isSuccess() { return success; }
        public String getMessage() { return message; }
    }

 
    public static class AuthResponse {
        private String token;

        public AuthResponse(String token) {
            this.token = token;
        }

        public String getToken() {
            return token;
        }
    }
}
