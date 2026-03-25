package com.ecommerce.backend.payload;

import com.ecommerce.backend.security.response.UserInfoResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.ResponseCookie;

@Data
@AllArgsConstructor
public class AuthenticationResult {
    private final UserInfoResponse userInfoResponse;
    private final ResponseCookie jwtCookie;
}
