package springsecurity.demo.entity;


import lombok.*;
import springsecurity.demo.entity.template.AbsEntity;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Student extends AbsEntity {

    @ManyToOne(cascade = CascadeType.REMOVE)
    private User user;

    private String password;

    @OneToMany(mappedBy = "student", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StJoinGroup> stJoinGroups;
}