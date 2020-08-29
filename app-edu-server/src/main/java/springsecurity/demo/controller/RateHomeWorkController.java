package springsecurity.demo.controller;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springsecurity.demo.payload.ApiResponse;
import springsecurity.demo.payload.ReqServiceStudent;
import springsecurity.demo.service.RateHomeworkService;


@RestController
@RequestMapping("/api/rateHomework")
public class RateHomeWorkController {

    final
    RateHomeworkService rateHomeworkService;

    public RateHomeWorkController(RateHomeworkService rateHomeworkService) {
        this.rateHomeworkService = rateHomeworkService;
    }

    @PostMapping("/rate")
    public HttpEntity<?> rate(@RequestBody ReqServiceStudent reqServiceStudent) {
        rateHomeworkService.rateStudent(reqServiceStudent);
        return ResponseEntity.ok("ok");
    }

    @PostMapping("/homeWork")
    public HttpEntity<?> homeWork(@RequestBody ReqServiceStudent reqServiceStudent) {
        ApiResponse apiResponse = rateHomeworkService.homeWork(reqServiceStudent);
        return ResponseEntity.status(apiResponse.isSuccess() ? HttpStatus.OK : HttpStatus.NOT_FOUND).body(apiResponse);
    }
}
