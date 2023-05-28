package com.ssafy.common.aop;

import java.util.Arrays;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Component
@Aspect
@Slf4j
public class LoggingAspect {

//    // com.ssafy.api 패키지밑 모든 클래스 (하위 클래스 포함)의 모든 인자 타입을 가진 모든 메서드 실행 전
//    @Before(value="execution(* com.ssafy.api..*.*(..))")
//    public void logging(JoinPoint jp) {
//
//        log.info("LoggingAspect => 메서드 선언부: {}", jp.getSignature());
//        log.info("LoggingAspect => 전달 파라미터: {}", Arrays.toString(jp.getArgs()));
//
//    }
}
