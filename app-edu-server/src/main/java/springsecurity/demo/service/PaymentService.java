package springsecurity.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import springsecurity.demo.entity.Payment;
import springsecurity.demo.entity.StJoinGroup;
import springsecurity.demo.entity.User;
import springsecurity.demo.payload.ApiResponse;
import springsecurity.demo.payload.ReqPayment;
import springsecurity.demo.payload.ResPageable;
import springsecurity.demo.payload.ResPayment;
import springsecurity.demo.repository.PaymentRepository;
import springsecurity.demo.repository.StJoinGroupRepository;

import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PaymentService {

    @Autowired
    PaymentRepository paymentRepository;

    @Autowired
    StJoinGroupRepository stJoinGroupRepository;

    public ApiResponse addPaymentStudent(ReqPayment reqPayment) {
        if (reqPayment.getPaymentSum() < 1) {
            return new ApiResponse("payment sum must not be 0", false);
        }
        StJoinGroup stJoinGroup = stJoinGroupRepository.findByStudent_IdAndGroup_Id(reqPayment.getStudentId(), reqPayment.getGroupId());
        Payment payment = new Payment();
        payment.setPaymentSum(reqPayment.getPaymentSum());
        payment.setDefinition(reqPayment.getDefinition());
        payment.setStJoinGroup(stJoinGroup);
        stJoinGroup.setBalance(stJoinGroup.getBalance() + reqPayment.getPaymentSum());
        paymentRepository.save(payment);
        stJoinGroupRepository.save(stJoinGroup);
        return new ApiResponse("payment saved", true);
    }

//    public StJoinGroup calculateLesson(StJoinGroup stJoinGroup,ReqPayment reqPayment) {
//        double b = stJoinGroup.getBalance();
//        double p = stJoinGroup.getPrice();
//        double count = 0;
//        while (stJoinGroup.getBalance() >= stJoinGroup.getPrice()) {
//            stJoinGroup.setBalance(stJoinGroup.getBalance() - stJoinGroup.getPrice());
//            stJoinGroup.setLessonCount(stJoinGroup.getLessonCount() + 1);
//        }
//        stJoinGroup.setRemainder(stJoinGroup.getBalance());
//        return stJoinGroup;
//    }


    public ResPageable getPayments(int page, int size, User user) {
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");
        Page<Payment> payments = paymentRepository.findAllByStJoinGroup_Student_User_EduCenter_Id(user.getEduCenter().getId(), pageable);
        return new ResPageable(
                page, size,
                payments.getTotalElements(),
                payments.getTotalPages(),
                payments.getContent().stream().map(this::resPayment).collect(Collectors.toList())
        );
    }

    public ResPayment resPayment(Payment payment) {
        StJoinGroup joinGroup = payment.getStJoinGroup();
        return new ResPayment(
                payment.getId(),
                payment.getCreatedAt().toString(),
                payment.getPaymentSum(),
                payment.getDefinition(),
                joinGroup.getStudent().getUser().getFirstName() + " " + joinGroup.getStudent().getUser().getLastName(),
                joinGroup.getGroup().getName()
        );
    }

    public boolean calculatePaymentSt(UUID id) {
//        Payment paymentLast = paymentRepository.getPaymentLast(id);
//        if (paymentLast != null) {
//            if (paymentLast.getBalance() > 0 && paymentLast.getCalculateNum() > 0) {
//                double s = paymentLast.getBalance() / paymentLast.getCalculateNum();
//                paymentLast.setBalance(paymentLast.getBalance() - s);
//                paymentLast.setCalculateNum(paymentLast.getCalculateNum() - 1);
//                return true;
//            } else {
//                paymentLast.setExpiredBalance(new Date());
//            }
//            paymentRepository.save(paymentLast);
//        }
        return false;
    }
}
