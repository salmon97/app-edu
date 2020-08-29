package springsecurity.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import springsecurity.demo.entity.Group;
import springsecurity.demo.entity.Teacher;
import springsecurity.demo.entity.User;
import springsecurity.demo.payload.ApiResponse;
import springsecurity.demo.payload.ResPageable;
import springsecurity.demo.payload.ResTeacher;
import springsecurity.demo.repository.GroupRepository;
import springsecurity.demo.repository.TeacherRepository;
import springsecurity.demo.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class TeacherService {

    @Autowired
    GroupRepository groupRepository;

    @Autowired
    TeacherRepository teacherRepository;

    @Autowired
    GroupService groupService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ContactService contactService;

    public ResPageable getTeachersGroup(int page, int size, User user) {
        Teacher teacher = teacherRepository.findByUser_Id(user.getId());
        UUID id = teacher.getId();
        Pageable pageable = PageRequest.of(page, size);
        Page<Group> byTeacherId = groupRepository.getAllByTeacherId(id, pageable);
        return new ResPageable(
                page, size,
                byTeacherId.getTotalElements(),
                byTeacherId.getTotalPages(),
                byTeacherId.getContent().stream().map(group -> groupService.getGroup(group)).collect(Collectors.toList())
        );
    }

    public List<ResTeacher> resTeachers(User user, String full) {
        List<Teacher> allByUser_eduCenter_id = teacherRepository.findAllByUser_EduCenter_Id(user.getEduCenter().getId());
        List<ResTeacher> resTeachers = new ArrayList<>();
        for (Teacher teacher : allByUser_eduCenter_id) {
            User getUser = userRepository.findById(teacher.getUser().getId()).orElseThrow(() -> new ResourceNotFoundException("getUser"));
            if (full.equals("full")) {
                resTeachers.add(new ResTeacher(
                        teacher.getId(),
                        teacher.getCreatedAt().toString().substring(0, 10),
                        getUser.getFirstName(),
                        getUser.getLastName(),
                        getUser.getPhoneNumber(),
                        teacherRepository.getAllGrName(teacher.getId()),
                        contactService.getContact(getUser.getContact())
                ));
            } else {
                resTeachers.add(new ResTeacher(teacher.getId(), getUser.getFirstName(), getUser.getLastName()));
            }
        }
        return resTeachers;
    }


    public ApiResponse deleteTeacher(UUID id) {
        teacherRepository.deleteTea(id);
        teacherRepository.deleteById(id);
        return new ApiResponse("deleted", true, id);
    }
}