package com.ssafy.common.db.repository.support;

import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepositorySupport {

    void closeSession(String id, String token);
}
