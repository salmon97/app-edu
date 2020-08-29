package springsecurity.demo.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import springsecurity.demo.entity.template.AbsEntity;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StJoinGroup extends AbsEntity {

    @ManyToOne
    private Student student;

    @ManyToOne
    private Group group;

    private Double price;
    private Integer lessonCount = 0;
    private Double remainder;
    private Double balance = 0.0;
    private Date expiredBalance;
//    private boolean todayPayed;

    @OneToMany(mappedBy = "stJoinGroup", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Payment> payments;

    @OneToMany(mappedBy = "stJoinGroup", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Attendance> attendances;
}
