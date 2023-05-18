package com.ssafy.common.util.encoder;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class PwdEncoder {
    
    public BCryptPasswordEncoder passwordEncoder() { return new BCryptPasswordEncoder(); }
}
