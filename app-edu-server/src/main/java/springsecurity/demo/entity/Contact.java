package springsecurity.demo.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import springsecurity.demo.entity.template.AbsEntity;

import javax.persistence.*;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Contact extends AbsEntity {

    @ManyToOne(optional = false)
    private District district;

    private String address;

    @Column(unique = true)
    private String email;

    @ElementCollection
    private Set<String> phoneNumbers;
}
