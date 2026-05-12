package com.kob.backend.service.impl.user.bot;


import com.kob.backend.mapper.BotMapper;
import com.kob.backend.pojo.Bot;
import com.kob.backend.pojo.User;
import com.kob.backend.service.impl.utils.UserDetailsImpl;
import com.kob.backend.service.user.bot.UpdateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class UpdateServiceImpl implements UpdateService {

    //查询bot信息
    @Autowired
    private BotMapper botMapper;


    @Override
    public Map<String, String> update(Map<String, String> data) {

        UsernamePasswordAuthenticationToken authenticationToken = (UsernamePasswordAuthenticationToken)
                SecurityContextHolder.getContext().getAuthentication();

        UserDetailsImpl loginUser = (UserDetailsImpl) authenticationToken.getPrincipal();
        User user = loginUser.getUser();

        int bot_id = Integer.parseInt(data.get("bot_id"));  //用户想要修改的bot
        //用户想要修改的内容，在controller中获取参数
        String title = data.get("title");
        String description = data.get("description");
        String content = data.get("content");


        Map<String, String> map = new HashMap<>();

        if(title == null || title.length() == 0) {
            map.put("error_message", "标题不能为空");
            return map;
        }

        if(title.length() > 100 ) {
            map.put("error_message", "标题长度不能大于100");
            return map;
        }

        if(description == null || description.length() == 0) {
            description = "null";   //不算错误，不用返回
        }

        if(description.length() > 300 ) {
            map.put("error_message", "Bot描述长度不能大于300");
            return map;
        }

        if(content == null || content.length() == 0) {
            map.put("error_message", "代码不能为空");
            return map;
        }

        if(content.length() > 10000) {
            map.put("error_message", "代码长度不能大于10000");
            return map;
        }

        Bot bot = botMapper.selectById(bot_id);

        if(bot == null) {
            map.put("error_message","bot不存在或已被删除");
            return map;
        }

        if(!bot.getUserId().equals(user.getId())) {
            map.put("error_message", "没有权限修改该bot");
        }

        Bot newbot = new Bot(
                bot.getId(),
                user.getId(),
                title,
                description,
                content,
                bot.getRating(),
                bot.getCreatetime(),
                new Date()
        );

        botMapper.updateById(newbot);   //传入修改后的对象

        map.put("error_message", "success");




        return map;
    }
}
