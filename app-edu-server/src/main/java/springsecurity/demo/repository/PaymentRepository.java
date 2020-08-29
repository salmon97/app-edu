package springsecurity.demo.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import springsecurity.demo.entity.Payment;

import java.util.UUID;


public interface PaymentRepository extends JpaRepository<Payment, UUID> {

    @Query(value = "select * from payment p where p.student_id = :id order by created_at desc limit 1", nativeQuery = true)
    Payment getPaymentLast(UUID id);

    Page<Payment> findAllByStJoinGroup_Student_User_EduCenter_Id(Integer student_user_eduCenter_id, Pageable pageable);
}
