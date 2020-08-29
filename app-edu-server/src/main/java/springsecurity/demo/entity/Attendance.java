package springsecurity.demo.entity;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import springsecurity.demo.entity.template.AbsEntity;

import javax.persistence.*;
import java.util.List;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Attendance extends AbsEntity {

    @ManyToOne
    private StJoinGroup stJoinGroup;

    private Boolean todayInLesson;
    private boolean explicable;
    private boolean relationToLesson;

    @OneToMany(mappedBy = "attendance", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RateHomeWork> rateHomeWorks;

}