package springsecurity.demo.payload;

import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class ReqServiceStudent {
    private UUID studentId;
    private UUID attendanceId;
    private UUID groupId;
    private UUID subjectId;
    private UUID stJoinGroupId;
    private Boolean todayInLesson;
    private boolean relationToLesson;
    private boolean explicable;
    private Integer rate;
    private String homeWork;
    private List<UUID> attendId;
}