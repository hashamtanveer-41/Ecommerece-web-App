package com.ecommerce.backend.controller;

import com.ecommerce.backend.payload.ContactRequest;
import com.ecommerce.backend.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ContactController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/contact")
    public ResponseEntity<String> sendContactEmail(@RequestBody ContactRequest contactRequest) {
        try {
            emailService.sendEmail(contactRequest);
            return ResponseEntity.ok("Your message has been sent successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to send your message. Please try again later.");
        }
    }
}
