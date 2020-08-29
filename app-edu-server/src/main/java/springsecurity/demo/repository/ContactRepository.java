package springsecurity.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import springsecurity.demo.entity.Contact;

import java.util.UUID;


public interface ContactRepository extends JpaRepository<Contact, UUID> {

    boolean existsByEmailEqualsIgnoreCase(String email);

    boolean existsByEmailEqualsIgnoreCaseAndIdNot(String email, UUID id);
}