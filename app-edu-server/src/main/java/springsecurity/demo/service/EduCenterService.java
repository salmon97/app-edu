package springsecurity.demo.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import springsecurity.demo.entity.EduCenter;
import springsecurity.demo.entity.User;
import springsecurity.demo.payload.ApiResponse;
import springsecurity.demo.payload.ReqEduCenter;
import springsecurity.demo.repository.EduCenterRepository;

@Service
public class EduCenterService {

    @Autowired
    EduCenterRepository eduCenterRepository;

    public ApiResponse addEduCenter(ReqEduCenter reqEduCenter) {
        EduCenter eduCenter = new EduCenter();
        eduCenter.setAdmissionCode(reqEduCenter.getAdmissionCode());
        eduCenter.setName(reqEduCenter.getName());
        EduCenter save = eduCenterRepository.save(eduCenter);
        return new ApiResponse("added", true, save);
    }


}
