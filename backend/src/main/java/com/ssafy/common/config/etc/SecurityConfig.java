package com.ssafy.common.config.etc;

import com.ssafy.api.service.JwtServiceImpl;
import com.ssafy.common.config.filter.JwtFilterConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtServiceImpl jwtService;

    private final CorsFilter corsFilter;

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http.csrf().disable()   // Rest API로 csrf 보안이 필요 없음 -> REST API를 이용한 서버는 session 기반 인증과 다르게 stateless하기 때문에 서버에 인증 정보를 보관하지 않음.
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)  // Jwt Token으로 인증하기에 세션 필요 없음
                .and()
                .httpBasic().disable()  // Rest API 로 기본설정 사용 안함 (기본설정 : 비 인증시 로그인폼 화면으로 리다이렉트)
                .formLogin().disable()
                .addFilter(corsFilter)  // @CrossOrigin(인증x), 시큐리티 필터에 등록 인증(o)
                .addFilterBefore(new JwtFilterConfig(jwtService), UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests()    // 다음 요청들에 대한 사용권한 체크
                .antMatchers("/session/login", "/session/regist", "/session/id", "/member/id", "/member/email", "/email/auth",
                        "/email/pwd", "/email/send", "/v3/api-docs/**", "/swagger-ui/**", "/swagger-resources/**").permitAll()
                .antMatchers("/**").authenticated();

        return http.build();

    }

}
