package springsecurity.demo.controller;

import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springsecurity.demo.entity.EduCenter;
import springsecurity.demo.entity.Hour;
import springsecurity.demo.entity.Subject;
import springsecurity.demo.entity.User;
import springsecurity.demo.payload.ApiResponse;
import springsecurity.demo.payload.ReqSubject;
import springsecurity.demo.repository.EduCenterRepository;
import springsecurity.demo.repository.HourRepository;
import springsecurity.demo.repository.SubjectRepository;
import springsecurity.demo.security.CurrentUser;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/subject")
public class SubjectController {

    final
    SubjectRepository subjectRepository;

    final
    EduCenterRepository eduCenterRepository;

    final
    HourRepository hourRepository;

    public SubjectController(SubjectRepository subjectRepository, EduCenterRepository eduCenterRepository, HourRepository hourRepository) {
        this.subjectRepository = subjectRepository;
        this.eduCenterRepository = eduCenterRepository;
        this.hourRepository = hourRepository;
    }


    @PostMapping("/addSubject")
    public HttpEntity<?> addSubject(@CurrentUser User user, @RequestBody ReqSubject reqSubject) {
        if (reqSubject.getId() != null) {
            hous();
            Subject getSubject = subjectRepository.findById(reqSubject.getId()).orElseThrow(() -> new ResourceNotFoundException("getSubject"));
            getSubject.setName(reqSubject.getName());
            subjectRepository.save(getSubject);
        } else {
            Optional<EduCenter> byId = eduCenterRepository.findById(user.getEduCenter().getId());
            Subject subject = new Subject();
            byId.ifPresent(subject::setEduCenter);
            subject.setName(reqSubject.getName());
            subjectRepository.save(subject);
        }
        List<Subject> allByEduCenter_id = subjectRepository.findAllByEduCenter_Id(user.getEduCenter().getId());
        return ResponseEntity.ok(new ApiResponse("ok", true, allByEduCenter_id));
    }

    @GetMapping("/getSubjects")
    public HttpEntity<?> getAllSubjects(@CurrentUser User user) {
        List<Subject> allByEduCenter_id = subjectRepository.findAllByEduCenter_Id(user.getEduCenter().getId());
        return ResponseEntity.ok(new ApiResponse("ok", true, allByEduCenter_id));
    }

    @DeleteMapping("/delete/{id}")
    public HttpEntity<?> deleteSubject(@PathVariable UUID id, @CurrentUser User user) {
        subjectRepository.deleteSub(id);
        subjectRepository.deleteById(id);
        List<Subject> allByEduCenter_id = subjectRepository.findAllByEduCenter_Id(user.getEduCenter().getId());
        return ResponseEntity.ok(new ApiResponse("ok", true, allByEduCenter_id));
    }


    public void hous() {
        for (int i = 1; i <= 24; i++) {
            Hour hour = new Hour();
            Hour hour1 = new Hour();
            if (i < 10) {
                hour.setName("0" + i + ":00");
                hour1.setName("0" + i + ":30");
            } else {
                hour.setName(i + ":00");
                hour1.setName(i + ":30");
            }
            hourRepository.save(hour);
            hourRepository.save(hour1);
        }

    }
}
