package springsecurity.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import springsecurity.demo.entity.Region;
import springsecurity.demo.projection.CustomDistrict;
import springsecurity.demo.projection.CustomRegion;

@CrossOrigin
@RepositoryRestResource(path = "region",collectionResourceRel = "list",excerptProjection = CustomRegion.class)
public interface RegionRepository extends JpaRepository<Region, Integer> {
}
