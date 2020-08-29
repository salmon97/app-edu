package springsecurity.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;
import springsecurity.demo.entity.Subject;
import springsecurity.demo.payload.ResSubject;

import java.util.List;
import java.util.UUID;

@Transactional
public interface SubjectRepository extends JpaRepository<Subject, UUID> {

    List<Subject> findAllByEduCenter_Id(Integer eduCenter_id);

    @Query(value = "select s.* from subject s, groups_subjects gr  where s.id = gr.subject_id and gr.group_id = :id",nativeQuery = true)
    List<Subject> getAllByGroupId(UUID id);

    @Modifying
    @Query(value = "DELETE FROM groups_subjects where subject_id = :id",nativeQuery = true)
    int deleteSub(UUID id);
}