package springsecurity.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import springsecurity.demo.entity.Hour;

@CrossOrigin
@RepositoryRestResource(path = "hour", collectionResourceRel = "list")
public interface HourRepository extends JpaRepository<Hour, Integer> {
}