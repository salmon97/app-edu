package springsecurity.demo.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import springsecurity.demo.entity.template.AbsEntity;

import javax.persistence.*;
import java.util.List;
import java.util.Map;
import java.util.Set;


@Getter
@Setter
@Entity(name = "groups")
@AllArgsConstructor
@NoArgsConstructor
public class Group extends AbsEntity {

    @ManyToOne(optional = false)
    private EduCenter eduCenter;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "groups_subjects",
            joinColumns = @JoinColumn(name = "group_id"),
            inverseJoinColumns = @JoinColumn(name = "subject_id")
    )
    private Set<Subject> subject;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "groups_teachers",
            joinColumns = @JoinColumn(name = "group_id"),
            inverseJoinColumns = @JoinColumn(name = "teacher_id")
    )
    private Set<Teacher> teacher;

    private String name;

    private String direction;

    private Double price;

    private boolean openGroup;

    @Column(nullable = false, unique = true)
    private String groupCode;

    @ElementCollection
    private Map<String, String> weekAndHour;

    @OneToMany(mappedBy = "group", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StJoinGroup> stJoinGroups;

}