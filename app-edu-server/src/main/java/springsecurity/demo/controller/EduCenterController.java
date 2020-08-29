package springsecurity.demo.controller;

import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springsecurity.demo.payload.ApiResponse;
import springsecurity.demo.payload.ReqEduCenter;
import springsecurity.demo.service.EduCenterService;

@RestController
@RequestMapping("/api")
public class EduCenterController {

    final
    EduCenterService eduCenterService;

    public EduCenterController(EduCenterService eduCenterService) {
        this.eduCenterService = eduCenterService;
    }


    @PostMapping("/admin/addEdu")
    public HttpEntity<?> add(@RequestBody ReqEduCenter reqEduCenter) {
        ApiResponse apiResponse = eduCenterService.addEduCenter(reqEduCenter);
        return ResponseEntity.ok(apiResponse);
    }
}
