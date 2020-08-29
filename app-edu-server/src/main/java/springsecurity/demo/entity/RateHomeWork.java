package springsecurity.demo.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import springsecurity.demo.entity.template.AbsEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RateHomeWork extends AbsEntity {

    @ManyToOne
    private Subject subject;

    @ManyToOne
    private Attendance attendance;

    private Integer rate;
    @Column(columnDefinition = "text")
    private String homeWork;

    public RateHomeWork(Subject subject, Attendance attendance, Integer rate) {
        this.subject = subject;
        this.attendance = attendance;
        this.rate = rate;
    }

    public RateHomeWork(Subject subject, Attendance attendance, String homeWork) {
        this.subject = subject;
        this.attendance = attendance;
        this.homeWork = homeWork;
    }
}
