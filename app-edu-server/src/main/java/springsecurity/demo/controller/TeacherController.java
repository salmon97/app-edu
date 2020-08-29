package springsecurity.demo.controller;


import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springsecurity.demo.entity.User;
import springsecurity.demo.payload.ApiResponse;
import springsecurity.demo.payload.ResTeacher;
import springsecurity.demo.security.CurrentUser;
import springsecurity.demo.service.TeacherService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/teacher")
public class TeacherController {


    final
    TeacherService teacherService;

    public TeacherController(TeacherService teacherService) {
        this.teacherService = teacherService;
    }

    //getTeachers for add group
    @GetMapping("/getTeachers/{full}")
    public HttpEntity<?> resTeachers(@PathVariable String full, @CurrentUser User user) {
        List<ResTeacher> resTeachers = teacherService.resTeachers(user, full);
        return ResponseEntity.ok(new ApiResponse("ok", true, resTeachers));
    }

    @DeleteMapping("/delete/{id}")
    public HttpEntity<?> delete(@PathVariable UUID id) {
        ApiResponse apiResponse = teacherService.deleteTeacher(id);
        return ResponseEntity.ok(apiResponse);
    }

}
