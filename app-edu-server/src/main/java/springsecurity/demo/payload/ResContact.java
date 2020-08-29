package springsecurity.demo.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import springsecurity.demo.entity.District;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResContact {
    private String regionName;
    private String districtName;
    private String address;
    private String email;
    private Set<String> phoneNumbers;
}
