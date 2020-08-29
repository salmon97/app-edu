package springsecurity.demo.payload;

import lombok.Data;
import springsecurity.demo.entity.enums.Gender;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.util.Date;

@Data
public class ReqRegister {
    @NotBlank
    private String firstName;
    @NotBlank
    private String lastName;

    private String identificationCode;
    @NotNull
    private Date birthDate;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Pattern(regexp = "^[+][9][9][8][0-9]{9}$", message = "Phone number must be 13 digits.")
    private String phoneNumber;
    @Pattern(regexp = "^(?:(?=.*?\\p{N})(?=.*?[\\p{S}\\p{P} ])(?=.*?\\p{Lu})(?=.*?\\p{Ll}))[^\\p{C}]{4,16}$", message = "Uzunligi 4-16 oralig'ida. Parolda kamida bitta katta harf, son va belgi b'lishi shart.")
    private String password;
    @Pattern(regexp = "[a-zA-Z0-9]{8,16}", message = "Uzunligi 6-16 b'lishi oralig'ida shart.")
    private String prePassword;
    private ReqContact reqContact;
    private String admissionCode;
}
