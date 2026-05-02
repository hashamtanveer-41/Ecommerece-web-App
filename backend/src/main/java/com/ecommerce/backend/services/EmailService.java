package com.ecommerce.backend.services;

import com.ecommerce.backend.payload.ContactRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import sendinblue.ApiClient;
import sendinblue.Configuration;
import sendinblue.auth.ApiKeyAuth;
import sibApi.TransactionalEmailsApi;
import sibModel.SendSmtpEmail;
import sibModel.SendSmtpEmailSender;
import sibModel.SendSmtpEmailTo;

import java.util.Collections;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${brevo.api.key}")
    String apiKey;

    public void sendEmail(ContactRequest contactRequest) {
        ApiClient defaultApiClient = Configuration.getDefaultApiClient();
        ApiKeyAuth apiKeyAuth = (ApiKeyAuth) defaultApiClient.getAuthentication("api-key");
        apiKeyAuth.setApiKey(apiKey);

        TransactionalEmailsApi apiInstance = new TransactionalEmailsApi();

        SendSmtpEmail sendSmtpEmail = new SendSmtpEmail();
        sendSmtpEmail.setSender(new SendSmtpEmailSender()
                .email("").name("Ecommerce Contact Form"));
        sendSmtpEmail.setTo(Collections.singletonList(new SendSmtpEmailTo().email(contactRequest.getEmail())));
        sendSmtpEmail.setSubject("Contact Form: " + contactRequest.getMessage());
        sendSmtpEmail.setHtmlContent("<html><body>" +
                "<h1>New Contact Request</h1>" +
                "<p><strong>Name:</strong> " + contactRequest.getName() + "</p>" +
                "<p><strong>Email:</strong> " + contactRequest.getEmail() + "</p>" +
                "<p><strong>Message:</strong> " + contactRequest.getMessage() + "</p>" +
                "</body></html>");

        try {
            apiInstance.sendTransacEmail(sendSmtpEmail);
        } catch (Exception e) {
            System.out.println("Error sending email: " + e.getMessage());
        }
//        // Implement email sending logic using JavaMailSender
//        SimpleMailMessage mailMessage = new SimpleMailMessage();
//        mailMessage.setTo("hashamtanvr41@gmail.com");
//        mailMessage.setSubject("New Contact Request from " + contactRequest.getName());
//        mailMessage.setText("Name: " + contactRequest.getName() + "\n" +
//                "Email: " + contactRequest.getEmail() + "\n" +
//                "Message: " + contactRequest.getMessage());
//        try {
//            mailSender.send(mailMessage);
//        } catch (Exception e) {
//            System.out.println("Error sending email: " + e.getMessage());
//        }
//    }
    }
}