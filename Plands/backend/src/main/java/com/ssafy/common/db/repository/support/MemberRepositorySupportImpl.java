package com.ssafy.common.db.repository.support;

import com.ssafy.api.service.JwtService;
import com.ssafy.api.service.RedisService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.concurrent.TimeUnit;

@Repository
@RequiredArgsConstructor
public class MemberRepositorySupportImpl implements MemberRepositorySupport{

    private final JwtService jwtService;

    private final RedisService redisService;

    @Transactional
    @Override
    public void closeSession(String id, String token) {

        Date expireTime = jwtService.getExpireTime(token);

        Date nowTime = new Date();
        Long remainTime = expireTime.getTime() - nowTime.getTime();

        redisService.delete(id+"_refresh_token");

        redisService.setBlackList(token, id, remainTime, TimeUnit.MILLISECONDS);
    }
}
