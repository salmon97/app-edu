package springsecurity.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import springsecurity.demo.entity.District;
import springsecurity.demo.projection.CustomDistrict;

import java.util.List;

@CrossOrigin
@RepositoryRestResource(path = "district",collectionResourceRel = "list",excerptProjection = CustomDistrict.class)
public interface DistrictRepository extends JpaRepository<District, Integer> {

    @RestResource(path = "getByRegion")
    List<District> findAllByRegion_Id(@Param(value = "id")int id);

}