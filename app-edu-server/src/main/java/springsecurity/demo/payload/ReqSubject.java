package springsecurity.demo.payload;

import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class ReqSubject {
    private UUID id;
    private String name;
}
