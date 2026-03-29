package com.ecommerce.backend.security;

import org.springframework.context.annotation.Configuration;

@Configuration
public class WebConfig {
    // CORS is now configured in WebSecurityConfig using CorsConfigurationSource
    // This avoids conflicts between WebMvcConfigurer CORS and Spring Security CORS
}
