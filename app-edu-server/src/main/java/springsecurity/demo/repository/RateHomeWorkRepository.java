package springsecurity.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import springsecurity.demo.entity.RateHomeWork;

import java.util.List;
import java.util.UUID;


public interface RateHomeWorkRepository extends JpaRepository<RateHomeWork, UUID> {
    List<RateHomeWork>  findByAttendance_Id(UUID attendance_id);
    List<RateHomeWork> findAllByAttendance_Id(UUID attendance_id);
}
