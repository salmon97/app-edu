package springsecurity.demo.controller;

import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springsecurity.demo.payload.ApiResponse;
import springsecurity.demo.payload.ReqServiceStudent;
import springsecurity.demo.payload.ResAttendance;
import springsecurity.demo.payload.ResStudent;
import springsecurity.demo.service.AttendanceService;
import springsecurity.demo.service.StudentService;

import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    final
    AttendanceService attendanceService;

    final
    StudentService studentService;

    public AttendanceController(AttendanceService attendanceService, StudentService studentService) {
        this.attendanceService = attendanceService;
        this.studentService = studentService;
    }

    @PostMapping("/attendance")
    public HttpEntity<?> attend(@RequestBody List<ReqServiceStudent> reqServiceStudent) {
        UUID id = null;
        for (ReqServiceStudent serviceStudent : reqServiceStudent) {
            if (serviceStudent.getStudentId() != null) {
                attendanceService.attend(serviceStudent);
            }
            id = serviceStudent.getGroupId();
        }
        if (id != null) {
            List<ResStudent> studentBrGr = studentService.getStudentIntoGrForTea(id);
            Object[] objects = {studentBrGr};
            return ResponseEntity.ok(objects);
        }
        return ResponseEntity.ok("ok");
    }

    @PostMapping("/relation")
    public HttpEntity<?> editAndRelation(@RequestBody ReqServiceStudent reqServiceStudent) {
        ResAttendance resAttendance = attendanceService.relationToLesson(reqServiceStudent);
        return ResponseEntity.ok(new ApiResponse("ok", true, resAttendance));
    }

    @PostMapping("/explicable")
    public HttpEntity<?> explicable(@RequestBody ReqServiceStudent reqServiceStudent) {
        ResAttendance explicable = attendanceService.explicable(reqServiceStudent);
        return ResponseEntity.ok(new ApiResponse("ok", true, explicable));
    }

}
