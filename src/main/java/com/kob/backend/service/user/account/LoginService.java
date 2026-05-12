package com.kob.backend.service.user.account;


import java.util.Map;

//service中定义api接口
public interface LoginService {
        public Map<String, String> getToken(String username, String password);

}
