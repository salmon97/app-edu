package springsecurity.demo.projection;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;
import springsecurity.demo.entity.District;
import springsecurity.demo.entity.Region;

@Projection(name = "customDistrict", types = District.class)
public interface CustomDistrict {
    Integer getId();

    String getName();

    @Value("#{target.region.id}")
    Integer getRegionId();
}
