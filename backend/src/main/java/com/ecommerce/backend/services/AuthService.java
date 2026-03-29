package com.ecommerce.backend.services;

import com.ecommerce.backend.payload.AuthenticationResult;
import com.ecommerce.backend.security.request.LoginRequest;
import com.ecommerce.backend.security.request.SignUpRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthService {
     ResponseEntity<?> register(SignUpRequest request);

     AuthenticationResult login(LoginRequest loginRequest);
}
