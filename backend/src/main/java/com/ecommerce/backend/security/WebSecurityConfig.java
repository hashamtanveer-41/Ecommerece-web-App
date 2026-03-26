//package com.ecommerce.backend.security;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.http.HttpMethod;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//
//@Configuration
//@EnableWebSecurity
//public class WebSecurityConfig {
//
//
//    @Bean
//    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
//        return authConfig.getAuthenticationManager();
//    }
//
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//
//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        http.csrf(csrf -> csrf.disable())
//                .cors(cors -> {})
//               // .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler))
//                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//                .authorizeHttpRequests(auth ->
//                        auth.requestMatchers("/api/auth/**").permitAll()
//                                .requestMatchers("/v3/api-docs/**").permitAll()
//                                .requestMatchers("/h2-console/**").permitAll()
//                                .requestMatchers("/api/admin/**").hasRole("ADMIN")
//                                .requestMatchers("/api/seller/**").hasAnyRole("ADMIN","SELLER")
//                                //.requestMatchers("/api/admin/**").permitAll()
//                                .requestMatchers("/api/public/**").permitAll()
//                                .requestMatchers("/swagger-ui/**").permitAll()
//                                .requestMatchers("/api/test/**").permitAll()
//                                .requestMatchers("/images/**").permitAll()
//                                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
//                                .anyRequest().authenticated()
//                );
////
////        http.authenticationProvider(authenticationProvider());
////
////        http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
//        http.headers(headers -> headers.frameOptions(
//                frameOptions -> frameOptions.sameOrigin()));
//
//        return http.build();
//    }
//}

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    SecurityFilterChain defauliSecurityFilterChain(HttpSecurity http) {
        http.authorizeHttpRequests((requests) -> requests.anyRequest().authenticated());
        http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

    }

}