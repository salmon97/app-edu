package springsecurity.demo.controller;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import springsecurity.demo.entity.User;
import springsecurity.demo.payload.ApiResponse;
import springsecurity.demo.payload.ReqPayment;
import springsecurity.demo.payload.ResPageable;
import springsecurity.demo.security.CurrentUser;
import springsecurity.demo.service.PaymentService;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    final
    PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }


    @PreAuthorize("hasAnyRole('ROLE_STAFF','ROLE_DIRECTOR')")
    @PostMapping("/addPayment")
    public HttpEntity<?> addPaymentSt(@RequestBody ReqPayment reqPayment) {
        ApiResponse apiResponse = paymentService.addPaymentStudent(reqPayment);
        return ResponseEntity.status(apiResponse.isSuccess() ? HttpStatus.CREATED : HttpStatus.CONFLICT).body(apiResponse);
    }

    @GetMapping("payments")
    public HttpEntity<?> getPayments(@RequestParam(value = "page", defaultValue = "0") Integer page,
                                     @RequestParam(value = "size", defaultValue = "5") Integer size, @CurrentUser User user) {
        ResPageable payments = paymentService.getPayments(page, size, user);
        return ResponseEntity.ok(payments);
    }

}
