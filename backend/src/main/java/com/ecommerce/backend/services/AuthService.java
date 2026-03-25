package com.ecommerce.backend.services;

import com.ecommerce.backend.payload.AuthenticationResult;
import com.ecommerce.backend.security.request.LoginRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthService {
     ResponseEntity<?> register();

     AuthenticationResult login(LoginRequest loginRequest);
}
