package springsecurity.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;
import springsecurity.demo.entity.StJoinGroup;

import java.util.List;
import java.util.UUID;

@Transactional
public interface StJoinGroupRepository extends JpaRepository<StJoinGroup, UUID> {
    StJoinGroup findByStudent_IdAndGroup_Id(UUID student_id, UUID group_id);

    boolean existsByStudent_IdAndGroup_Id(UUID student_id, UUID group_id);

    List<StJoinGroup> findByStudent_Id(UUID student_id);

    List<StJoinGroup> findAllByGroup_Id(UUID group_id);

    int deleteByStudent_Id(UUID student_id);

    int deleteByStudent_IdAndGroup_Id(UUID student_id, UUID group_id);

}
