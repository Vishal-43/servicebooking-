package com.setu.setu.reposoratory;

import org.springframework.data.jpa.repository.JpaRepository;
import com.setu.setu.models.*;
import java.util.List;
import org.springframework.stereotype.Repository;


@Repository
public interface bookingimagereposiraotry extends JpaRepository<bookingimage, Long> {
    List<bookingimage> findByBooking(bookings booking);
    List<bookingimage> findByBooking_id(Long bookingId);


}
