package springsecurity.demo.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import springsecurity.demo.entity.Group;

import java.util.List;
import java.util.UUID;


public interface GroupRepository extends JpaRepository<Group, UUID> {

    boolean existsByGroupCode(String groupCode);

    Group findByGroupCode(String groupCode);

    Page<Group> findAllByEduCenter_Id(Integer eduCenter_id, Pageable pageable);

//    List<Group> findAllByEduCenter_Id(Integer eduCenter_id);

    @Query(value = "select count(*) from groups where edu_center_id = :id", nativeQuery = true)
    Integer getCountGroup(Integer id);

    @Query(value = "select g.* from groups g , groups_teachers gr where gr.group_id =g.id and gr.teacher_id = :id order by created_at desc", nativeQuery = true)
    Page<Group> getAllByTeacherId(UUID id, Pageable pageable);

    @Query(value = "select count(*) from groups g , groups_teachers gr where gr.group_id =g.id and gr.teacher_id = :id", nativeQuery = true)
    Integer getGroupByCont(UUID id);

//    @Query(value = "select g.* from students_groups stg ,groups g where stg.group_id = g.id and stg.student_id = :studentId", nativeQuery = true)
//    Page<Group> getGroupByStudentId(UUID studentId, Pageable pageable);

}
