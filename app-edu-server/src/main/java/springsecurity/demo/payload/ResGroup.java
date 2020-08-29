package springsecurity.demo.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.UUID;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResGroup {
    private UUID id;
    private String name;
    private String groupCode;
    private String direction;
    private String createdAt;
    private double price;

    public ResGroup(UUID id, String name) {
        this.id = id;
        this.name = name;
    }
}
