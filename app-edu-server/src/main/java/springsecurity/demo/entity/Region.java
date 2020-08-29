package springsecurity.demo.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import springsecurity.demo.entity.template.AbsNameEntity;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class Region extends AbsNameEntity {

}
