package springsecurity.demo.entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import springsecurity.demo.entity.template.AbsNameEntity;

import javax.persistence.*;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EduCenter extends AbsNameEntity {

    @Column(nullable = false,unique = true)
    private String admissionCode;

    private String nameLLC;

    private Double balance;

    private boolean active = true;

}