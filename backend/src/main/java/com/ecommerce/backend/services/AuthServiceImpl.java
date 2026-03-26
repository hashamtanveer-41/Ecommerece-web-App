//package com.ecommerce.backend.services;
//
//import com.ecommerce.backend.payload.AuthenticationResult;
//import com.ecommerce.backend.repostories.RoleRepository;
//import com.ecommerce.backend.repostories.UserRepository;
//import com.ecommerce.backend.security.jwt.JWTUtils;
//import com.ecommerce.backend.security.request.LoginRequest;
//import com.ecommerce.backend.security.services.UserDetailsImpl;
//import jakarta.transaction.Transactional;
//import org.modelmapper.ModelMapper;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseCookie;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//@Transactional
//public class AuthServiceImpl implements AuthService{
//
////    @Autowired
////    private AuthenticationManager authenticationManager;
////
//   @Autowired
//    UserRepository userRepository;
//
//    @Autowired
//    JWTUtils jwtUtils;
//
//    @Autowired
//    RoleRepository roleRepository;
//
//    @Autowired
//    PasswordEncoder passwordEncoder;
//
//    @Autowired
//    ModelMapper modelMapper;
//
//    @Override
//    public ResponseEntity<?> register( ) {
//        return null;
//    }
//
//    @Override
//    public AuthenticationResult login(LoginRequest loginRequest) {
//        Authentication authentication = authenticationManager
//                .authenticate(new UsernamePasswordAuthenticationToken
//                        (loginRequest.getUsername(), loginRequest.getPassword()));
//
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//
//        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
//
//        ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);
//
////        List<String> roles = userDetails.getAuthorities().stream
//
//        return null;
//    }
//}
