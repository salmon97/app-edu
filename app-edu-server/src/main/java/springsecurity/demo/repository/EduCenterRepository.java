package springsecurity.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import springsecurity.demo.entity.EduCenter;

import java.util.Optional;


public interface EduCenterRepository extends JpaRepository<EduCenter, Integer> {
    boolean existsByAdmissionCode(String admissionCode);

    Optional<EduCenter> findByAdmissionCode(String admissionCode);

}
