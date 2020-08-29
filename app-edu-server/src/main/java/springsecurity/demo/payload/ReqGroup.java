package springsecurity.demo.payload;

import lombok.Data;
import springsecurity.demo.entity.Subject;
import springsecurity.demo.entity.Teacher;

import javax.validation.constraints.Pattern;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Data
public class ReqGroup {
    private UUID id;
    private String name;
    private String direction;
    @Pattern(regexp = "[a-zA-Z0-9]{4,8}", message = "group code must be between 4 and 8 characters")
    private String groupCode;
    private double price;
    private Map<String,String> weekAndHour;
    private List<UUID> subjectId;
    private List<UUID> teacherId;
}
