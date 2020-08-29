package springsecurity.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import springsecurity.demo.entity.User;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    boolean existsByIdentificationCode(String identificationCode);

    Optional<User> findByIdentificationCode(String identificationCode);

    @Query(value = "select u.* from users u , user_role ur where u.id = ur.user_id \n" +
            "and ur.role_id = :roleName and u.edu_center_id = :eduId", nativeQuery = true)
    List<User> getAllStaff(String roleName, int eduId);
}
