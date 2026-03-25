package com.ecommerce.backend.security.services;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.logging.log4j.simple.internal.SimpleProvider;

@Data
@NoArgsConstructor
public class UserDetailsImpl {


    public SimpleProvider.Config getAuthorities() {
        return null;
    }
}
