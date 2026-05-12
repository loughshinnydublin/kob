package com.kob.backend.service.impl.user.account;


//实现api接口

import com.kob.backend.pojo.User;
import com.kob.backend.service.impl.utils.JwtUtil;
import com.kob.backend.service.impl.utils.UserDetailsImpl;
import com.kob.backend.service.user.account.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service    //实现Service需要加注解
public class LoginServiceImpl implements LoginService {

    @Autowired  //注入需要用到的库
    private AuthenticationManager authenticationManager;



    @Override
    public Map<String, String> getToken(String username, String password) {
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(username, password);    //将用户名和密码封装成类，存加密之后的密码
        //验证用户是否登录成功，如果登录失败会自动处理
        Authentication authenticate = authenticationManager.authenticate(authenticationToken);

        //登录成功后取出用户

        UserDetailsImpl loginUser = (UserDetailsImpl) authenticate.getPrincipal();
        User user = loginUser.getUser();

        //用户id封装成jwt-token
        //pojo层里用户的id定义为Integer可以toString
        String jwt = JwtUtil.createJWT(user.getId().toString());

        Map<String, String> map = new HashMap<>();
        map.put("error_message", "success");    //默认成功
        map.put("token", jwt);  //返回token

        return map;
    }
}
