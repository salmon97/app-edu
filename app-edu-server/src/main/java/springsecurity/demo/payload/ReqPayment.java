package springsecurity.demo.payload;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Set;
import java.util.UUID;

@Data
public class ReqPayment {
    private UUID studentId;
    private UUID groupId;
    private Double paymentSum;
    private Integer calculateNum;
    private String definition;
}
