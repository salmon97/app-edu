package springsecurity.demo.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import springsecurity.demo.entity.*;
import springsecurity.demo.entity.enums.RoleName;
import springsecurity.demo.payload.ApiResponse;
import springsecurity.demo.payload.ReqRegister;
import springsecurity.demo.payload.ResUser;
import springsecurity.demo.repository.*;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    ContactService contactService;

    @Autowired
    GroupRepository groupRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    TeacherRepository teacherRepository;

    @Autowired
    EduCenterRepository eduCenterRepository;

    @Autowired
    StJoinGroupRepository stJoinGroupRepository;

    public ApiResponse register(ReqRegister reqRegister) {

        if (eduCenterRepository.existsByAdmissionCode(reqRegister.getAdmissionCode()) || groupRepository.existsByGroupCode(reqRegister.getAdmissionCode())) {
            if (!userRepository.existsByIdentificationCode(reqRegister.getIdentificationCode())) {
                if (reqRegister.getPassword().equals(reqRegister.getPrePassword())) {
                    Optional<EduCenter> byAdmissionCode = eduCenterRepository.findByAdmissionCode(reqRegister.getAdmissionCode());
                    if (byAdmissionCode.isPresent()) {
                        users(reqRegister, RoleName.ROLE_DIRECTOR, byAdmissionCode.get());
                    } else {
                        Group byGroupCode = groupRepository.findByGroupCode(reqRegister.getAdmissionCode());
                        Student student = new Student();
                        student.setUser(users(reqRegister, RoleName.ROLE_STUDENT, byGroupCode.getEduCenter()));
                        student.setPassword(reqRegister.getPassword());
                        studentRepository.save(student);
                        StJoinGroup stJoinGroup = new StJoinGroup();
                        stJoinGroup.setStudent(student);
                        stJoinGroup.setGroup(byGroupCode);
                        stJoinGroup.setPrice(byGroupCode.getPrice());
                        stJoinGroupRepository.save(stJoinGroup);
                    }
                    return new ApiResponse("successfully registered", true);
                }
                return new ApiResponse("password & prePassword not equals ", false);
            }
            return new ApiResponse("like This User exist", false);
        }
        return new ApiResponse("admissionCode wrong", false);
    }

    //register staffs and teachers
    public ApiResponse staffAndTeacher(ReqRegister reqRegister, User user, String which) {
        if (!userRepository.existsByIdentificationCode(reqRegister.getIdentificationCode())) {
            if (reqRegister.getPassword().equals(reqRegister.getPrePassword())) {
                if (which.equals("teacher")) {
                    Teacher teacher = new Teacher();
                    teacher.setUser(users(reqRegister, RoleName.ROLE_TEACHER, user.getEduCenter()));
                    teacherRepository.save(teacher);
                } else if (which.equals("staff")) {
                    users(reqRegister, RoleName.ROLE_STAFF, user.getEduCenter());
                }
                return new ApiResponse("successfully registered", true);
            }
            return new ApiResponse("password & prePassword not equals ", false);
        }
        return new ApiResponse("like This User exist", false);
    }

    public User users(ReqRegister reqRegister, RoleName roleName, EduCenter eduCenter) {
        User user = new User(
                eduCenter,
                reqRegister.getFirstName(),
                reqRegister.getLastName(),
                reqRegister.getIdentificationCode(),
                reqRegister.getBirthDate(),
                reqRegister.getPhoneNumber(),
                passwordEncoder.encode(reqRegister.getPassword()),
                contactService.addContact(reqRegister.getReqContact()),
                Collections.singleton(roleRepository.findByRoleName(roleName))
        );
        return userRepository.save(user);
    }


    public ApiResponse getUsers(User user, String roleName) {
        List<User> allStaff = userRepository.getAllStaff(roleName, user.getEduCenter().getId());
        List<ResUser> resUsers = allStaff.stream().map(user1 -> new ResUser(
                user1.getId(),
                user1.getFirstName(),
                user1.getLastName(),
                user1.getPhoneNumber(),
                contactService.getContact(user1.getContact())
        )).collect(Collectors.toList());
        return new ApiResponse("ok", true, resUsers);
    }

    public ApiResponse delete(UUID id) {
        userRepository.deleteById(id);
        return new ApiResponse("deleted", true, id);
    }

    public UserDetails getUserById(UUID id) {
        return userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("getUser"));
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        return userRepository.findByIdentificationCode(s).orElseThrow(() -> new UsernameNotFoundException("getUser"));
    }
}
