package com.ecommerce.backend.services;

import com.ecommerce.backend.payload.ContactRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(ContactRequest contactRequest) {
        // Implement email sending logic using JavaMailSender
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo("hashamtanvr41@gmail.com");
        mailMessage.setSubject("New Contact Request from " + contactRequest.getName());
        mailMessage.setText("Name: " + contactRequest.getName() + "\n" +
                "Email: " + contactRequest.getEmail() + "\n" +
                "Message: " + contactRequest.getMessage());
        mailSender.send(mailMessage);

        }
}
