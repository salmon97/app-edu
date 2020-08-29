package springsecurity.demo.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResAttendance {
    private UUID id;
    private String createdAt;
    private Boolean todayInLesson;
    private boolean relationToLesson;
    private boolean explicable;
    private List<ResRateHomeWork> resRateHomeWorks;


    public ResAttendance(UUID id, boolean relationToLesson) {
        this.id = id;
        this.relationToLesson = relationToLesson;
    }

    public ResAttendance(String createdAt, Boolean todayInLesson, boolean relationToLesson, List<ResRateHomeWork> resRateHomeWorks) {
        this.createdAt = createdAt;
        this.todayInLesson = todayInLesson;
        this.relationToLesson = relationToLesson;
        this.resRateHomeWorks = resRateHomeWorks;
    }
}
