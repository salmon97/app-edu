package springsecurity.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import springsecurity.demo.entity.Attendance;
import springsecurity.demo.entity.StJoinGroup;
import springsecurity.demo.payload.ReqServiceStudent;
import springsecurity.demo.payload.ResAttendance;
import springsecurity.demo.repository.AttendanceRepository;
import springsecurity.demo.repository.StJoinGroupRepository;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Service
public class AttendanceService {

    @Autowired
    AttendanceRepository attendanceRepository;

    @Autowired
    StJoinGroupRepository stJoinGroupRepository;


    public ResAttendance relationToLesson(ReqServiceStudent reqServiceStudent) {
        Attendance attendance = attendanceRepository.findById(reqServiceStudent.getAttendanceId()).orElseThrow(() -> new ResourceNotFoundException("getAttendanceID"));
        attendance.setRelationToLesson(reqServiceStudent.isRelationToLesson());
        Attendance save = attendanceRepository.save(attendance);
        return new ResAttendance(save.getId(), save.isRelationToLesson());
    }

    public void attend(ReqServiceStudent reqServiceStudent) {
        Attendance attendanceByStudent = attendanceRepository.getAttendanceByStudent(reqServiceStudent.getStJoinGroupId());
        StJoinGroup stJoinGroup = stJoinGroupRepository.findByStudent_IdAndGroup_Id(reqServiceStudent.getStudentId(), reqServiceStudent.getGroupId());
        if (attendanceByStudent == null) {
            Attendance attendance = new Attendance();
            attendance.setStJoinGroup(stJoinGroup);
            attendance.setTodayInLesson(reqServiceStudent.getTodayInLesson());
            attendanceRepository.save(attendance);
            takeMoney(stJoinGroup);
        } else {
            attendanceByStudent.setTodayInLesson(reqServiceStudent.getTodayInLesson());
            attendanceByStudent.setExplicable(false);
            attendanceRepository.save(attendanceByStudent);
        }
    }

    public ResAttendance explicable(ReqServiceStudent reqServiceStudent) {
        Attendance attendanceByStudent = attendanceRepository.getAttendanceByStudent(reqServiceStudent.getStJoinGroupId());
        StJoinGroup stJoinGroup = stJoinGroupRepository.findByStudent_IdAndGroup_Id(reqServiceStudent.getStudentId(), reqServiceStudent.getGroupId());
        if (attendanceByStudent == null) {
            attendanceByStudent = new Attendance();
            attendanceByStudent.setStJoinGroup(stJoinGroup);
        } else {
            attendanceByStudent.setExplicable(reqServiceStudent.isExplicable());
            attendanceByStudent.setTodayInLesson(false);
            attendanceRepository.save(attendanceByStudent);
            cancelTakeMoney(stJoinGroup);
        }
        return new ResAttendance(attendanceByStudent.getId(), attendanceByStudent.isExplicable());
    }

    public void takeMoney(StJoinGroup stJoinGroup) {
//        if (!stJoinGroup.isTodayPayed()) {
//            stJoinGroup.setTodayPayed(true);
        stJoinGroup.setBalance(stJoinGroup.getBalance() - stJoinGroup.getPrice());
        stJoinGroupRepository.save(stJoinGroup);
//        }
    }

    public void cancelTakeMoney(StJoinGroup stJoinGroup) {
//        if (stJoinGroup.isTodayPayed()) {
//            stJoinGroup.setTodayPayed(false);
        stJoinGroup.setBalance(stJoinGroup.getBalance() + stJoinGroup.getPrice());
        stJoinGroupRepository.save(stJoinGroup);
//        }
    }

}
