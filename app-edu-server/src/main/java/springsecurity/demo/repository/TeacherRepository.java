package springsecurity.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import springsecurity.demo.entity.Teacher;

import java.util.List;
import java.util.UUID;

@Transactional
public interface TeacherRepository extends JpaRepository<Teacher, UUID> {
    Teacher findByUser_Id(UUID user_id);

    List<Teacher> findAllByUser_EduCenter_Id(Integer user_eduCenter_id);

    @Query(value = "select t.* from teacher t, groups_teachers gr  where t.id = gr.teacher_id and gr.group_id = :id", nativeQuery = true)
    List<Teacher> getAllByGroupId(UUID id);

    @Query(value = "select g.name from groups g, groups_teachers gr  where g.id = gr.group_id and gr.teacher_id = :id", nativeQuery = true)
    List<String> getAllGrName(UUID id);

    @Modifying
    @Query(value = "DELETE FROM groups_teachers where teacher_id = :id",nativeQuery = true)
    int deleteTea(UUID id);
}
