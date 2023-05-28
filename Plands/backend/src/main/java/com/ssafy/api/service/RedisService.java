package com.ssafy.api.service;

import java.util.concurrent.TimeUnit;

public interface RedisService {

    void set(String key, Object value, Long time, TimeUnit timeUnit);
    Object get(String key);
    boolean delete(String key);
    boolean hasKey(String key);
    void setBlackList(String key, Object value, Long time, TimeUnit timeUnit);
    Object getBlackList(String key);
    boolean deleteBlackList(String key);
    boolean hasKeyBlackList(String key);
}
