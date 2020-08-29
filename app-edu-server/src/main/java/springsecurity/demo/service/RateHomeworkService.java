package springsecurity.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import springsecurity.demo.entity.RateHomeWork;
import springsecurity.demo.payload.ApiResponse;
import springsecurity.demo.payload.ReqServiceStudent;
import springsecurity.demo.repository.AttendanceRepository;
import springsecurity.demo.repository.RateHomeWorkRepository;
import springsecurity.demo.repository.SubjectRepository;

import java.util.List;
import java.util.UUID;

@Service
public class RateHomeworkService {


    @Autowired
    RateHomeWorkRepository rateHomeWorkRepository;

    @Autowired
    AttendanceRepository attendanceRepository;

    @Autowired
    SubjectRepository subjectRepository;


    public void rateStudent(ReqServiceStudent reqServiceStudent) {
        if (reqServiceStudent.getRate() > 5) reqServiceStudent.setRate(5);
        if (reqServiceStudent.getRate() < 3) reqServiceStudent.setRate(3);
        List<RateHomeWork> byAttendId = rateHomeWorkRepository.findByAttendance_Id(reqServiceStudent.getAttendanceId());
        boolean newRate = true;
        if (byAttendId != null) {
            for (RateHomeWork rateHomeWork : byAttendId) {
                if (rateHomeWork.getSubject().getId().equals(reqServiceStudent.getSubjectId())) {
                    rateHomeWork.setRate(reqServiceStudent.getRate());
                    rateHomeWorkRepository.save(rateHomeWork);
                    newRate = false;
                    break;
                }
            }
        }
        if (newRate) {
            RateHomeWork rateHomeWork = new RateHomeWork(
                    subjectRepository.findById(reqServiceStudent.getSubjectId()).orElseThrow(() -> new ResourceNotFoundException("getSubject")),
                    attendanceRepository.findById(reqServiceStudent.getAttendanceId()).orElseThrow(() -> new ResourceNotFoundException("getAttendance")),
                    reqServiceStudent.getRate()
            );
            rateHomeWorkRepository.save(rateHomeWork);
        }
    }

    public ApiResponse homeWork(ReqServiceStudent reqServiceStudent) {
        if (reqServiceStudent.getAttendId().size() != 0) {
            for (UUID uuid : reqServiceStudent.getAttendId()) {
                List<RateHomeWork> byAttendId = rateHomeWorkRepository.findByAttendance_Id(uuid);
                boolean newRate = true;
                if (byAttendId != null) {
                    for (RateHomeWork rateHomeWork : byAttendId) {
                        if (rateHomeWork.getSubject().getId().equals(reqServiceStudent.getSubjectId())) {
                            rateHomeWork.setHomeWork(reqServiceStudent.getHomeWork());
                            rateHomeWorkRepository.save(rateHomeWork);
                            newRate = false;
                            break;
                        }
                    }
                }
                if (newRate) {
                    RateHomeWork rateHomeWork = new RateHomeWork(
                            subjectRepository.findById(reqServiceStudent.getSubjectId()).orElseThrow(() -> new ResourceNotFoundException("getSubject")),
                            attendanceRepository.findById(uuid).orElseThrow(() -> new ResourceNotFoundException("getAttendance")),
                            reqServiceStudent.getHomeWork()
                    );
                    rateHomeWorkRepository.save(rateHomeWork);
                }
            }
            return new ApiResponse("ok", true);
        }
        return new ApiResponse("o'quvchilarni yoqlama qilishiz kerak", false);
    }
}
