package com.ssafy.api.service;


import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.mail.Message;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    private final String ADMIN_ADDRESS = "ssafytest@naver.com";

    @Async
    public void sendPwd(String email, String pwd) throws Exception {

        MimeMessage message = mailSender.createMimeMessage();
        message.addRecipients(Message.RecipientType.TO, email);
        message.setSubject("플랜즈 비밀번호 찾기 안내");

        String text = "임시 비밀번호는 " + "[ " +  pwd + " ] 입니다.";
        message.setText(text, "utf-8");
        message.setFrom(new InternetAddress(ADMIN_ADDRESS, "플랜즈"));

        mailSender.send(message);
    }

    @Async
    public void emailAuth(String email, String code) throws Exception {

        MimeMessage message = mailSender.createMimeMessage();
        message.addRecipients(Message.RecipientType.TO, email);
        message.setSubject("플랜즈 이메일 인증 안내");

        String text = "인증번호는" + " [ " + code + " ] 입니다.";
        message.setText(text, "utf-8");
        message.setFrom(new InternetAddress(ADMIN_ADDRESS, "플랜즈"));

        mailSender.send(message);
    }

    @Async
    public void sendJoinRequest(String id, String email, String link) throws Exception {

            MimeMessage message = mailSender.createMimeMessage();
            message.addRecipients(Message.RecipientType.TO, email);
            message.setSubject("플랜즈 초대 요청");

            String text = id + " 님 께서 귀하를 초대하고자 합니다. 링크를 누르면 계획에 참여합니다. "
                    + "<br/>"
                    + "<a href=\"" + link + "\"> " + link + " </a>";
            message.setContent(text, "text/html; charset=utf-8");
            message.setFrom(new InternetAddress(ADMIN_ADDRESS, "플랜즈"));

            mailSender.send(message);

    }
}

