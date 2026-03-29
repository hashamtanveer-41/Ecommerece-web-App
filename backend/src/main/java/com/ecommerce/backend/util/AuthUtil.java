package com.ecommerce.backend.util;

import com.ecommerce.backend.exceptions.ResourceNotFoundException;
import com.ecommerce.backend.model.User;
import com.ecommerce.backend.repostories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class AuthUtil {

    @Autowired
    private UserRepository userRepository;
    public String loggedInEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        assert authentication != null;
        User user = userRepository.findByUserName(authentication.getName())
                .orElseThrow(() -> new UsernameNotFoundException("User not Found with username: "+ authentication.getName()));
        return user.getEmail();
    }
    public User loggedInUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        assert authentication != null;
        return userRepository.findByUserName(authentication.getName())
                .orElseThrow(() -> new UsernameNotFoundException("User not Found with username: "+ authentication.getName()));
    }
}
