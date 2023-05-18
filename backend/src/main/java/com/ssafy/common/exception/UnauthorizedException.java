package com.ssafy.common.exception;

import lombok.extern.log4j.Log4j2;

@Log4j2
public class UnauthorizedException extends Exception{

    public UnauthorizedException() {
    }

    public UnauthorizedException(String message) {
        log.debug(message);
    }
}
