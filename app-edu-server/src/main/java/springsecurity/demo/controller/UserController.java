package springsecurity.demo.controller;


import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springsecurity.demo.entity.User;
import springsecurity.demo.payload.ApiResponse;
import springsecurity.demo.payload.ReqLogin;
import springsecurity.demo.payload.ReqRegister;
import springsecurity.demo.payload.ResToken;
import springsecurity.demo.repository.EduCenterRepository;
import springsecurity.demo.repository.GroupRepository;
import springsecurity.demo.security.CurrentUser;
import springsecurity.demo.security.JwtTokenProvider;
import springsecurity.demo.service.UserService;

import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    final
    JwtTokenProvider jwtTokenProvider;

    final
    UserService userService;

    final
    AuthenticationManager authenticationManager;

    final
    EduCenterRepository eduCenterRepository;

    final
    GroupRepository groupRepository;

    public UserController(JwtTokenProvider jwtTokenProvider, UserService userService, AuthenticationManager authenticationManager, EduCenterRepository eduCenterRepository, GroupRepository groupRepository) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.eduCenterRepository = eduCenterRepository;
        this.groupRepository = groupRepository;
    }


    @DeleteMapping("/delete/{id}")
    public HttpEntity<?> delete(@PathVariable UUID id) {
        ApiResponse delete = userService.delete(id);
        return ResponseEntity.ok(delete);
    }

    @GetMapping("/users")
    public HttpEntity<?> getUsers(@CurrentUser User user, @RequestParam(value = "roleName") String roleName) {
        ApiResponse users = userService.getUsers(user, roleName);
        return ResponseEntity.ok(users);
    }

    @PostMapping("/registerTeacher/{which}")
    public HttpEntity<?> staffAndTeacher(@PathVariable String which, @RequestBody ReqRegister reqRegister, @CurrentUser User user) {
        ApiResponse response = userService.staffAndTeacher(reqRegister, user, which);
        return ResponseEntity.status(response.isSuccess() ? HttpStatus.CREATED : HttpStatus.CONFLICT).body(response);
    }

    @PostMapping("/register")
    public HttpEntity<?> registerUser(@RequestBody ReqRegister reqRegister) {
        ApiResponse response = userService.register(reqRegister);
        return ResponseEntity.status(response.isSuccess() ? HttpStatus.CREATED : HttpStatus.CONFLICT).body(response);
    }

    @PostMapping("/checkCode")
    public HttpEntity<?> checkCode(@RequestParam String code) {
        ApiResponse apiResponse = new ApiResponse("incorrect code", false);
        if (eduCenterRepository.existsByAdmissionCode(code) || groupRepository.existsByGroupCode(code)) {
            apiResponse = new ApiResponse("ok", true);
        }
        return ResponseEntity.status(apiResponse.isSuccess() ? HttpStatus.OK : HttpStatus.LOCKED).body(apiResponse);
    }

    @PostMapping("/login")
    public HttpEntity<?> login(@RequestBody ReqLogin reqLogin) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                reqLogin.getIdentificationCode(),
                reqLogin.getPassword()
        ));
        String token = jwtTokenProvider.generateToken(authentication);
        return ResponseEntity.ok(new ResToken(token));
    }


    @GetMapping("/userMe")
    public HttpEntity<?> userMe(@CurrentUser User user) {
        return ResponseEntity.status(user == null ? 409 : 200).body(user);
//        return ResponseEntity.status(user==null?HttpStatus.CONFLICT:HttpStatus.OK).body(user);
    }
}
