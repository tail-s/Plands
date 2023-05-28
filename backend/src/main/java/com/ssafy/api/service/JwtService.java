package com.ssafy.api.service;

import com.ssafy.common.db.dto.response.TokenDto;
import org.springframework.security.core.Authentication;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

public interface JwtService {

    TokenDto createToken(String id, String tokenType);
    String getUsername(String token);
    Date getExpireTime(String token);
    String resolveToken(HttpServletRequest request);
    Authentication getAuthentication(String token);
    boolean validateToken(String token);

}
