package springsecurity.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import springsecurity.demo.entity.Week;

@CrossOrigin
@RepositoryRestResource(path = "week", collectionResourceRel = "list")
public interface WeekRepository extends JpaRepository<Week, Integer> {
}