package com.setu.setu.reposoratory;
import org.springframework.data.jpa.repository.JpaRepository;
import com.setu.setu.models.user;
import java.util.Optional;
// import com.setu.setu.models.userdetails; 

public interface UserRepository extends JpaRepository<user, Long> {
    Optional<user> findById(Long id);
    user findByEmail(String email);
}
