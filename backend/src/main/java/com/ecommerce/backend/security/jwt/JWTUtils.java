package com.ecommerce.backend.security.jwt;

import com.ecommerce.backend.security.services.UserDetailsImpl;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.util.WebUtils;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;
import java.util.logging.Logger;

@Component
public class JWTUtils {

    private static final Logger logger = (Logger) LoggerFactory.getLogger(JWTUtils.class);
    @Value("${spring.app.jwtSecret}")
    private String jwtSecret;

    @Value("${spring.app.jwtExpirationMs}")
    private int jwtExpirationMs;

    @Value("${spring.ecom.app.jwtCookieName}")
    private String jwtCookieName;

    public String getJwtFromHeader(HttpServletRequest request){
        Cookie cookie = WebUtils.getCookie(request, jwtCookieName);
        if (cookie!=null){
            return cookie.getValue();
        }else {
            return null;
        }
    }
    // Generate Token from the username
    public String generateTokenFromUsername(UserDetails userDetails){
        String username =userDetails.getUsername();
        return Jwts.builder().
                subject(username).
                issuedAt(new Date())
                .expiration(new Date(((new Date().getTime()) + jwtExpirationMs)))
                .signWith((SecretKey) key())
                .compact();
    }
    //Getting username from the JWT Token
    public String getUsernameFromJWTToken(String token){
        return Jwts.parser().verifyWith((SecretKey) key()).build().parseSignedClaims(token).getPayload().getSubject();

    }

    public Key key(){
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }
    public ResponseCookie generateJwtCookie(UserDetailsImpl userDetails) {
        return null;
    }
    //Validate JWT token
    public boolean validateJwtToken(String authToken){
        try{
            System.out.println("Validate");
            Jwts.parser()
                    .verifyWith((SecretKey) key())
                    .build()
                    .parseSignedClaims(authToken);
            return true;
        }catch (Exception e){
            logger.severe(e.getMessage());
        }
        return false;
    }

}
