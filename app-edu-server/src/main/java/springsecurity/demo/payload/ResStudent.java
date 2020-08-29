package springsecurity.demo.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResStudent {
    private String createdAt;
    private UUID studentId;
    private UUID groupId;
    private UUID stJoinGroupId;
    private UUID attendanceId;
    private String firstName;
    private String lastName;
    private String identificationCode;
    private String phoneNumber;
    private String groupName;
    private Boolean todayInLesson;
    private Boolean relationToLesson;
    private boolean explicable;
    private String subjectName;
    private String password;
    private ResContact resContact;
    private List<ResStJoinGroup> resStJoinGroups;

    public ResStudent(UUID groupId, String createdAt, UUID studentId, String firstName, String lastName, String identificationCode, String phoneNumber, String password, ResContact resContact,List<ResStJoinGroup> resStJoinGroups) {
        this.groupId = groupId;
        this.createdAt = createdAt;
        this.studentId = studentId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.identificationCode = identificationCode;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.resContact = resContact;
        this.resStJoinGroups = resStJoinGroups;
    }


    public ResStudent(UUID groupId,UUID stJoinGroupId, UUID studentId, String firstName, String lastName, Boolean todayInLesson, Boolean relationToLesson,boolean explicable, UUID attendanceId,List<ResStJoinGroup> resStJoinGroups) {
        this.groupId = groupId;
        this.stJoinGroupId = stJoinGroupId;
        this.studentId = studentId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.todayInLesson = todayInLesson;
        this.relationToLesson = relationToLesson;
        this.explicable = explicable;
        this.attendanceId = attendanceId;
        this.resStJoinGroups = resStJoinGroups;
    }

}
