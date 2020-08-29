//package springsecurity.demo.Bot;
//
//import com.vdurmont.emoji.EmojiParser;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Component;
//import org.telegram.telegrambots.bots.TelegramLongPollingBot;
//import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
//import org.telegram.telegrambots.meta.api.objects.Update;
//import org.telegram.telegrambots.meta.exceptions.TelegramApiException;
//import springsecurity.demo.entity.Group;
//import springsecurity.demo.entity.Student;
//import springsecurity.demo.payload.ResAttendance;
//import springsecurity.demo.payload.ResGroup;
//import springsecurity.demo.payload.ResPageable;
//import springsecurity.demo.payload.ResRateHomeWork;
//import springsecurity.demo.repository.StudentRepository;
//import springsecurity.demo.service.StudentService;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.UUID;
//
//@Component
//public class StudentControlBot extends TelegramLongPollingBot {
//
//    @Value("${botToken}")
//    private String botToken;
//
//    @Value("${botUserName}")
//    private String botUserName;
//
//    @Autowired
//    StudentService studentService;
//
//    @Autowired
//    StudentRepository studentRepository;
//
//    int page = 0;
//    int size = 5;
//    int level = 0;
//
//    @Override
//    public void onUpdateReceived(Update update) {
//
//
//
//        SendMessage sendMessage = new SendMessage();
//        String text = update.getMessage().getText();
//        if (level == 0) {
//            if (text.equals("/start")) {
//                sendMessage.setText("login va parol kiriting misol uchun \n AA123*** 123***");
//                level = 1;
//            } else {
//                sendMessage.setText("/start <- boshing");
//
//            }
//            sendMessage.setChatId(update.getMessage().getChatId());
//            try {
//                execute(sendMessage);
//            } catch (TelegramApiException e) {
//                e.printStackTrace();
//            }
//        }
//
//
//           switch (level){
//               case 1:
//                   if (text.contains(" ")){
//                       String[] loginParol  = text.split(" ");
//                   boolean b = studentRepository.checkLoginAndPassword(loginParol[0], loginParol[1]);
//                     if (b){
//                         Student studentByLoginAndPassword = studentRepository.getStudentByLoginAndPassword(loginParol[0], loginParol[1]);
//                         if (studentByLoginAndPassword.getGroups().size() == 1) {
//                             UUID groupId = studentByLoginAndPassword.getGroups().iterator().next().getId();
//                             List<ResAttendance> limit5 = studentService.getLimit5(studentByLoginAndPassword.getId(), groupId);
//                             for (ResAttendance resAttendance : limit5) {
//                                String relation = resAttendance.getRelationToLesson()?EmojiParser.parseToUnicode("\uD83D\uDC4D"):EmojiParser.parseToUnicode("\uD83D\uDC4E");
//                                 String todayLes =resAttendance.getTodayInLesson()?"✅":"❌";
//                                 StringBuilder res = new StringBuilder("имя " + studentByLoginAndPassword.getUser().getFirstName() +
//                                         "\nдата " + resAttendance.getCreatedAt() +
//                                         "\nсегодня на уроке " + todayLes +
//                                         "\nотношение к уроку " + relation);
//                                 for (ResRateHomeWork resRateHomeWork : resAttendance.getResRateHomeWorks()) {
//                                      res.append("\nпредмет ").append(resRateHomeWork.getSubjectName()).append(" оценка ").append(resRateHomeWork.getRate());
//                                 }
//                                 sendMessage.setText(res.toString());
//                                 sendMessage.setChatId(update.getMessage().getChatId());
//                                 try {
//                                     execute(sendMessage);
//                                 } catch (TelegramApiException e) {
//                                     e.printStackTrace();
//                                 }
//                                 level = 0;
//                             }
//
//                         }else {
//                             List<ResGroup> resGroups = new ArrayList<>();
//                             for (Group group : studentByLoginAndPassword.getGroups()) {
//                                 resGroups.add(new ResGroup(group.getId(),group.getDirection()));
//                             }
//                         }
//                     } else {
//                         sendMessage.setText("login yoki parol xato");
//                         sendMessage.setChatId(update.getMessage().getChatId());
//                         try {
//                             execute(sendMessage);
//                         } catch (TelegramApiException e) {
//                             e.printStackTrace();
//                         }
//                     }
//
//                   }
//
////                   }else {
////                       sendMessage.setText("login yoki parol xato");
////                   }
//                   break;
//               case 2:
//
//                   break;
//
//           }
//
//    }
//
//    @Override
//    public String getBotUsername() {
//        return botUserName;
//    }
//
//    @Override
//    public String getBotToken() {
//        return botToken;
//    }
//}
