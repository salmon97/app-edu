package springsecurity.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import springsecurity.demo.entity.*;
import springsecurity.demo.payload.*;
import springsecurity.demo.repository.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class StudentService {

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    ContactService contactService;

    @Autowired
    AttendanceRepository attendanceRepository;

    @Autowired
    RateHomeWorkRepository rateHomeWorkRepository;

    @Autowired
    GroupRepository groupRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    StJoinGroupRepository stJoinGroupRepository;

//    public ApiResponse searchStudent(String firstName,String lastName){
//        List<Student> byUser_firstNameIgnoreCaseOrUser_lastNameIgnoreCase = studentRepository.findByUser_FirstNameIgnoreCaseAndUser_LastNameIgnoreCase(firstName, lastName);
//        return new ApiResponse("ok",true,byUser_firstNameIgnoreCaseOrUser_lastNameIgnoreCase);
//    }

    public ApiResponse getGroup(UUID id) {
        List<ResGroup> collect = stJoinGroupRepository.findByStudent_Id(id).stream().map(stJoinGroup -> new ResGroup(stJoinGroup.getGroup().getId(), stJoinGroup.getGroup().getName())).collect(Collectors.toList());
        return new ApiResponse("ok", true, collect);
    }

    public ApiResponse addStudentToGr(String groupCode, UUID stId) {
        if (groupRepository.existsByGroupCode(groupCode)) {
            Group byGroupCode = groupRepository.findByGroupCode(groupCode);
            if (!stJoinGroupRepository.existsByStudent_IdAndGroup_Id(stId, byGroupCode.getId())) {
                Student student = studentRepository.findById(stId).orElseThrow(() -> new ResourceNotFoundException("getStudent"));
                StJoinGroup stJoinGroup = new StJoinGroup();
                stJoinGroup.setGroup(byGroupCode);
                stJoinGroup.setStudent(student);
                stJoinGroup.setPrice(byGroupCode.getPrice());
                stJoinGroupRepository.save(stJoinGroup);
                return new ApiResponse("student added to group", true);
            }
            return new ApiResponse("this student already exist to group", false);
        }
        return new ApiResponse("groupCode invalid", false);
    }


    public List<ResRateHomeWork> getRetHomeWorks(UUID id) {
        List<RateHomeWork> allByAttendance_id = rateHomeWorkRepository.findAllByAttendance_Id(id);
        List<ResRateHomeWork> resRateHomeWorks = new ArrayList<>();
        for (RateHomeWork rateHomeWork : allByAttendance_id) {
            resRateHomeWorks.add(new ResRateHomeWork(rateHomeWork.getRate() == null ? null : rateHomeWork.getRate().toString(), rateHomeWork.getHomeWork(), rateHomeWork.getSubject().getName()));
        }
        return resRateHomeWorks;
    }

    public ResAttendance getStudentDetails(Attendance attendance) {
        return new ResAttendance(
                attendance.getCreatedAt().toString().substring(0, 10),
                attendance.getTodayInLesson(),
                attendance.isRelationToLesson(),
                getRetHomeWorks(attendance.getId())
        );
    }

    //for student
    public ResPageable pageableDetails(int page, int size, UUID studentId, UUID groupId) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        StJoinGroup byStudent_idAndGroup_id = stJoinGroupRepository.findByStudent_IdAndGroup_Id(studentId, groupId);
        Page<Attendance> allByStudent_id = attendanceRepository.findAllByStJoinGroup_Id(byStudent_idAndGroup_id.getId(), pageable);
        return new ResPageable(
                page, size,
                allByStudent_id.getTotalElements(),
                allByStudent_id.getTotalPages(),
                allByStudent_id.getContent().stream().map(this::getStudentDetails).collect(Collectors.toList())
        );
    }

    public List<ResStudent> getStudentIntoGrForStaff(UUID groupId) {
        List<StJoinGroup> allByGroup_id = stJoinGroupRepository.findAllByGroup_Id(groupId);
        List<ResStudent> resStudents = new ArrayList<>();
        for (StJoinGroup stJoinGroup : allByGroup_id) {
            resStudents.add(getStudent(stJoinGroup.getStudent(), groupId));
        }
        return resStudents;
    }

    //for into group
    public ResStJoinGroup resStJoinGroupForGr(UUID studentId, UUID groupId) {
        StJoinGroup stJoinGroup = stJoinGroupRepository.findByStudent_IdAndGroup_Id(studentId, groupId);
        return new ResStJoinGroup(
                stJoinGroup.getCreatedAt().toString(),
                null,
                stJoinGroup.getGroup().getName(),
                stJoinGroup.getLessonCount(),
                stJoinGroup.getBalance(),
                stJoinGroup.getPrice(),
                stJoinGroup.getExpiredBalance()
        );
    }

    //for edu
    public List<ResStJoinGroup> resStJoinGroupList(UUID studentId) {
        List<StJoinGroup> stJoinGroups = stJoinGroupRepository.findByStudent_Id(studentId);
        return stJoinGroups.stream().map(stJoinGroup -> new ResStJoinGroup(
                stJoinGroup.getCreatedAt().toString(),
                null, stJoinGroup.getGroup().getName(),
                stJoinGroup.getLessonCount(),
                stJoinGroup.getBalance(),
                stJoinGroup.getPrice(),
                stJoinGroup.getExpiredBalance()
        )).collect(Collectors.toList());
    }


    public ResStudent getStudent(Student student, UUID groupId) {
        User getUser = userRepository.findById(student.getUser().getId()).orElseThrow(() -> new ResourceNotFoundException("getUser"));
        return new ResStudent(
                student.getId(),
                student.getCreatedAt().toString().substring(0, 10),
                student.getId(),
                getUser.getFirstName(),
                getUser.getLastName(),
                getUser.getIdentificationCode(),
                getUser.getPhoneNumber(),
                student.getPassword(),
                contactService.getContact(getUser.getContact()),
                groupId != null ? Collections.singletonList(resStJoinGroupForGr(student.getId(), groupId)) : resStJoinGroupList(student.getId())
        );
    }


    public ResPageable getStudentByEdu(int page, int size, int eduId) {
        Page<Student> eduCenter_id = studentRepository.findAllByUser_EduCenter_Id(eduId, PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt")));
        return new ResPageable(
                page, size,
                eduCenter_id.getTotalElements(),
                eduCenter_id.getTotalPages(),
                eduCenter_id.getContent().stream().map(student -> getStudent(student, null)).collect(Collectors.toList())
        );
    }

    public List<ResStudent> getStudentIntoGrForTea(UUID groupId) {
        List<StJoinGroup> allByGroup_id = stJoinGroupRepository.findAllByGroup_Id(groupId);
        List<ResStudent> resStudents = new ArrayList<>();
        for (StJoinGroup stJoinGroup : allByGroup_id) {
            User getUser = userRepository.findById(stJoinGroup.getStudent().getUser().getId()).orElseThrow(() -> new ResourceNotFoundException("getUser"));
            Attendance attendanceByStudentId = attendanceRepository.getAttendanceByStudent(stJoinGroup.getId());
            resStudents.add(new ResStudent(
                    groupId,
                    stJoinGroup.getId(),
                    stJoinGroup.getStudent().getId(),
                    getUser.getFirstName(),
                    getUser.getLastName(),
                    attendanceByStudentId != null ? attendanceByStudentId.getTodayInLesson() : false,
                    attendanceByStudentId != null && attendanceByStudentId.isRelationToLesson(),
                    attendanceByStudentId != null && attendanceByStudentId.isExplicable(),
                    attendanceByStudentId != null ? attendanceByStudentId.getId() : null,
                    Collections.singletonList(new ResStJoinGroup(stJoinGroup.getCreatedAt().toString(), stJoinGroup.getLessonCount(), stJoinGroup.getBalance(), stJoinGroup.getExpiredBalance(), stJoinGroup.getPrice()))
            ));
        }
        return resStudents;
    }

    //delete full student
    public ApiResponse deleteStudent(UUID id) {
        if (studentRepository.existsById(id)) {
            studentRepository.deleteById(id);
            return new ApiResponse("deleted", true, id);
        } else {
            return new ApiResponse("no deleted", false);
        }
    }

    //remove student into group
    public ApiResponse deleteStFromGr(ReqServiceStudent reqServiceStudent) {
        if (reqServiceStudent.getStudentId() != null && reqServiceStudent.getGroupId() != null) {
            stJoinGroupRepository.deleteByStudent_IdAndGroup_Id(reqServiceStudent.getStudentId(), reqServiceStudent.getGroupId());
            return new ApiResponse("removed", true);
        }
        return new ApiResponse("no removed", false);
    }


}


