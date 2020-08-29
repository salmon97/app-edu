package springsecurity.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import springsecurity.demo.entity.Contact;
import springsecurity.demo.exception.ExistException;
import springsecurity.demo.payload.ReqContact;
import springsecurity.demo.payload.ResContact;
import springsecurity.demo.repository.ContactRepository;
import springsecurity.demo.repository.DistrictRepository;
import java.util.Optional;
import java.util.UUID;


@Service
public class ContactService {

    @Autowired
    DistrictRepository districtRepository;
    @Autowired
    ContactRepository contactRepository;

    Contact addContact(ReqContact reqContact) {
        if (contactRepository.existsByEmailEqualsIgnoreCase(reqContact.getEmail())) {
            throw new ExistException("like this email exist");
        }
        return contactRepository.save(new Contact(
                districtRepository.findById(reqContact.getDistrictId()).orElseThrow(() -> new ResourceNotFoundException("getDistrict")),
                reqContact.getAddress(),
                reqContact.getEmail(),
                reqContact.getPhoneNumbers()
        ));

    }

    Contact editContact(UUID id, ReqContact reqContact) {
        if (contactRepository.existsByEmailEqualsIgnoreCaseAndIdNot(reqContact.getEmail(), id)) {
            throw new ExistException("like this email exist");
        }
        Optional<Contact> optionalContact = contactRepository.findById(id);
        if (optionalContact.isPresent()) {
            Contact contact = optionalContact.get();
            contact.setDistrict(districtRepository.findById(reqContact.getDistrictId()).orElseThrow(() -> new ResourceNotFoundException("getDistrict")));
            contact.setAddress(reqContact.getAddress());
            contact.setEmail(reqContact.getEmail());
            contact.setPhoneNumbers(reqContact.getPhoneNumbers());
            return contactRepository.save(contact);
        }
        throw new ResourceNotFoundException("Bunday conact topilmadi");
    }


    ResContact getContact(Contact contact) {
        return new ResContact(
                contact.getDistrict().getRegion().getName(),
                contact.getDistrict().getName(),
                contact.getAddress(),
                contact.getEmail(),
                contact.getPhoneNumbers()
        );
    }

}
