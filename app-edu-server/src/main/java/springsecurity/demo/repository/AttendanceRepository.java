package springsecurity.demo.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import springsecurity.demo.entity.Attendance;

import java.util.List;
import java.util.UUID;


public interface AttendanceRepository extends JpaRepository<Attendance, UUID> {

    Page<Attendance> findAllByStJoinGroup_Id(UUID stJoinGroup_id, Pageable pageable);

//    @Query(value = "select * from attendance a where a.student_id = :studentId and a.group_id = :groupId order by created_at desc limit 5",nativeQuery = true)
//    List<Attendance> getAttendanceLimit5(UUID studentId,UUID groupId);

    @Query(value = "select * from attendance a where a.st_join_group_id = :stJoinGroupId and Date(a.created_at) = current_date", nativeQuery = true)
    Attendance getAttendanceByStudent(UUID stJoinGroupId);
}