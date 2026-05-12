package com.kob.backend.controller.user.account;

import com.kob.backend.service.impl.user.account.InfoServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;


@RestController
public class InfoController {

    //注入接口，接口需要@Service注释
    @Autowired
    private InfoServiceImpl infoService;

    @GetMapping("/user/account/info/")
    public Map<String, String> getinfo() {
        return infoService.getinfo();
    }

}
