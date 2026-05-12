package com.kob.backend.controller.pk;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/pk/") //访问pk目录时执行下方函数
public class indexController {
    @RequestMapping("index/")
    public String index() {
        return "pk/index.html"; //返回template页面，前后端不分离。
    }
}
