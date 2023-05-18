package com.ssafy.api.service;

public interface EmailService {
    void sendPwd(String email, String pwd) throws Exception;
    void emailAuth(String email, String code) throws Exception;
    void sendJoinRequest(String id, String email, String link) throws Exception;
}
