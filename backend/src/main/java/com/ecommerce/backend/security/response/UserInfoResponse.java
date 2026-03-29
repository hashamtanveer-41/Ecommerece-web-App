package com.ecommerce.backend.security.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
public class UserInfoResponse {
    private Long id;
    private String jwtCookie;
    private String username;
    private String email;
    private List<String> roles;


    public UserInfoResponse(Long id, String username, String email, List<String> roles, String jwtCookie) {
     this.id = id;
     this.username = username;
     this.email = email;
     this.roles = roles;
     this.jwtCookie = jwtCookie;
    }

    public UserInfoResponse(Long id, String username, String email, List<String> roles) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.roles = roles;
    }
}
