package springsecurity.demo.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResPayment {
    private UUID id;
    private String date;
    private double paymentSum;
    private String definition;
    private String studentFullName;
    private String groupName;
}
