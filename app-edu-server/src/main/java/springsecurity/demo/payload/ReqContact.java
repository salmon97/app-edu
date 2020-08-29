package springsecurity.demo.payload;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.util.Set;

@Data
public class ReqContact {
    @NotNull
    private Integer districtId;
    private String address;
    @Email
    private String email;
    //    @Pattern(regexp = "^[+][9][9][8][0-9]{9}$", message = "Phone number must be 13 digits.")
    private Set<String> phoneNumbers;
}
