package springsecurity.demo.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResUser {
    private UUID id;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private ResContact resContact;

}
