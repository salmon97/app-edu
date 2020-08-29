package springsecurity.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import springsecurity.demo.entity.Role;
import springsecurity.demo.entity.User;
import springsecurity.demo.entity.enums.RoleName;

import java.util.List;

public interface RoleRepository extends JpaRepository<Role, Integer> {

    Role findByRoleName(RoleName roleName);


}
