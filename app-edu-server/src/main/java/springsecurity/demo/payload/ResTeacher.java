package springsecurity.demo.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResTeacher {
    private UUID id;
    private String joinDate;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private List<String> groupsName;
    private ResContact resContact;

    public ResTeacher(UUID id, String firstName, String lastName) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
