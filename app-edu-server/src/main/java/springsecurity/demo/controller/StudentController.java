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
import springsecurity.demo.payload.ReqServiceStudent;
import springsecurity.demo.payload.ResPageable;
import springsecurity.demo.repository.StudentRepository;
import springsecurity.demo.security.CurrentUser;
import springsecurity.demo.service.GroupService;
import springsecurity.demo.service.StudentService;

import java.util.UUID;

@RestController
@RequestMapping("/api/student")
public class StudentController {

    final
    StudentService studentService;

    final
    GroupService groupService;

    final
    StudentRepository studentRepository;

    public StudentController(StudentService studentService, GroupService groupService, StudentRepository studentRepository) {
        this.studentService = studentService;
        this.groupService = groupService;
        this.studentRepository = studentRepository;
    }


//    @GetMapping("search")
//    public HttpEntity<?> searchStudent(@RequestParam(value = "firstName") String firstName,@RequestParam(value = "lastName") String lastName){
//        ApiResponse apiResponse = studentService.searchStudent(firstName, lastName);
//        return ResponseEntity.ok(apiResponse);
//    }

    @GetMapping("/getGroup/{id}")
    public HttpEntity<?> getCount(@PathVariable UUID id) {
        return ResponseEntity.ok(studentService.getGroup(id));
    }

    @DeleteMapping("delete/{id}")
    public HttpEntity<?> deleteStudent(@PathVariable UUID id) {
        ApiResponse apiResponse = studentService.deleteStudent(id);
        return ResponseEntity.status(apiResponse.isSuccess() ? HttpStatus.OK : HttpStatus.BAD_REQUEST).body(apiResponse);
    }


    @PostMapping("/addStudent")
    public HttpEntity<?> addStudentToGr(@RequestParam(value = "groupCode") String groupCode, @RequestParam(value = "stId") UUID stId) {
        ApiResponse apiResponse = studentService.addStudentToGr(groupCode, stId);
        return ResponseEntity.status(apiResponse.isSuccess() ? HttpStatus.CREATED : HttpStatus.CONFLICT).body(apiResponse);
    }

    @DeleteMapping("/deleteFromGr")
    public HttpEntity<?> deleteStudentFromGr(@RequestBody ReqServiceStudent reqServiceStudent) {
        ApiResponse apiResponse = studentService.deleteStFromGr(reqServiceStudent);
        return ResponseEntity.status(apiResponse.isSuccess() ? HttpStatus.CREATED : HttpStatus.CONFLICT).body(apiResponse);
    }


    @GetMapping("/getStudents/{id}")
    public HttpEntity<?> getCount(@PathVariable UUID id, @CurrentUser User user) {
        return ResponseEntity.ok(getByRole(id, user));
    }

    public Object[] getByRole(UUID id, User user) {
        for (Role role : user.getRoles()) {
            if (role.getRoleName().equals(RoleName.ROLE_STAFF) || role.getRoleName().equals(RoleName.ROLE_DIRECTOR))
                return new Object[]{studentService.getStudentIntoGrForStaff(id), groupService.getSubjectByGrId(id), groupService.getTeachersByGrId(id)};

            if (role.getRoleName().equals(RoleName.ROLE_TEACHER))
                return new Object[]{studentService.getStudentIntoGrForTea(id), groupService.getSubjectByGrId(id), null};
        }
        return null;
    }

    @GetMapping("/{groupId}")
    public HttpEntity<?> getStudentDetail(@PathVariable UUID groupId, @RequestParam(value = "page", defaultValue = "0") Integer page,
                                          @RequestParam(value = "size", defaultValue = "5") Integer size, @CurrentUser User user) {
        Student byUser_id = studentRepository.findByUser_Id(user.getId());
        ResPageable resPageable = studentService.pageableDetails(page, size, byUser_id.getId(), groupId);
        return ResponseEntity.ok(resPageable);
    }

    @GetMapping("/students")
    public HttpEntity<?> getStudentByEdu(@RequestParam(value = "page", defaultValue = "0") Integer page,
                                         @RequestParam(value = "size", defaultValue = "5") Integer size, @CurrentUser User user) {
        ResPageable studentByEdu = studentService.getStudentByEdu(page, size, user.getEduCenter().getId());
        return ResponseEntity.ok(studentByEdu);
    }

}
