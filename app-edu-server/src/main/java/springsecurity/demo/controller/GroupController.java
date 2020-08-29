package springsecurity.demo.controller;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springsecurity.demo.entity.Role;
import springsecurity.demo.entity.Student;
import springsecurity.demo.entity.User;
import springsecurity.demo.entity.enums.RoleName;
import springsecurity.demo.payload.ApiResponse;
import springsecurity.demo.payload.ReqGroup;
import springsecurity.demo.repository.StudentRepository;
import springsecurity.demo.security.CurrentUser;
import springsecurity.demo.service.GroupService;
import springsecurity.demo.service.StudentService;
import springsecurity.demo.service.TeacherService;

import java.text.ParseException;
import java.util.UUID;

@RestController
@RequestMapping("/api/group")
public class GroupController {

    final
    TeacherService teacherService;

    final
    StudentService studentService;

    final
    StudentRepository studentRepository;

    final
    GroupService groupService;

    public GroupController(GroupService groupService, TeacherService teacherService, StudentService studentService, StudentRepository studentRepository) {
        this.groupService = groupService;
        this.teacherService = teacherService;
        this.studentService = studentService;
        this.studentRepository = studentRepository;
    }

    @PostMapping("/openGroup/{id}")
    public HttpEntity<?> openGroup(@PathVariable UUID id) throws ParseException {
        boolean b = groupService.openGroup(id);
        return ResponseEntity.ok(b);
    }

    @DeleteMapping("deleteGr/{id}")
    public HttpEntity<?> deleteGroup(@PathVariable UUID id) {
        return ResponseEntity.ok(groupService.deleteGroup(id));
    }

    @DeleteMapping("/deleteChild")
    public HttpEntity<?> deleteChild(@RequestParam(value = "groupId") UUID groupId, @RequestParam(value = "childId") UUID childId) {
        ApiResponse apiResponse = groupService.deleteChild(groupId, childId);
        return ResponseEntity.status(apiResponse.isSuccess() ? HttpStatus.OK : HttpStatus.BAD_REQUEST).body(apiResponse);
    }

    @PostMapping("/addGroup")
    public HttpEntity<?> addGroup(@CurrentUser User user, @RequestBody ReqGroup reqGroup) {
        if (reqGroup.getId() != null) {
            ApiResponse apiResponse = groupService.changeGroup(reqGroup);
            return ResponseEntity.status(apiResponse.isSuccess() ? HttpStatus.OK : HttpStatus.CONFLICT).body(apiResponse);
        } else {
            ApiResponse apiResponse = groupService.addGroup(reqGroup, user);
            return ResponseEntity.status(apiResponse.isSuccess() ? HttpStatus.OK : HttpStatus.CONFLICT).body(apiResponse);
        }
    }

    @GetMapping("/getGroup")
    public HttpEntity<?> getGroups(@RequestParam(value = "page", defaultValue = "0") Integer page,
                                   @RequestParam(value = "size", defaultValue = "5") Integer size, @CurrentUser User user) {
        for (Role role : user.getRoles()) {
            if (role.getRoleName().equals(RoleName.ROLE_STAFF) || role.getRoleName().equals(RoleName.ROLE_DIRECTOR)) {
                return ResponseEntity.ok(groupService.getStaffGroup(page, size, user));
            }
            if (role.getRoleName().equals(RoleName.ROLE_TEACHER)) {
                return ResponseEntity.ok(teacherService.getTeachersGroup(page, size, user));
            }
            if (role.getRoleName().equals(RoleName.ROLE_STUDENT)) {
                Student byUser_id = studentRepository.findByUser_Id(user.getId());
                return ResponseEntity.ok(groupService.getGroupForStudent(byUser_id.getId()));
            }
        }
        return ResponseEntity.status(HttpStatus.CONFLICT).body("conflict");
    }
}
