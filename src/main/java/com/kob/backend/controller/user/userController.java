package com.kob.backend.controller.user;


import com.kob.backend.mapper.UserMapper;
import com.kob.backend.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


//调试用
@RestController
public class userController {

    @Autowired  //用数据库中的mapper
    UserMapper userMapper;  //该接口由mybatisplus实现


    @GetMapping("/user/all/") //映射get类型请求
    public List<User> getAll() {
        return userMapper.selectList(null); //查询所有
    }

    @GetMapping("/user/{userId}/")
    public User getUser(@PathVariable int userId) { //注解作用为获取getmapping大括号中的内容
        return userMapper.selectById(userId);
    }

    @GetMapping("/user/add/{userId}/{username}/{password}/")   //插入user, 适用post
    public String addUser(
            @PathVariable int userId,
            @PathVariable String username,
            @PathVariable String password) {
        User user = new User(userId, username, password, null);
        userMapper.insert(user);
        return "Add user successfully";
    }

    @PostMapping("user/delete/{userId}")
    public String deleteUser(@PathVariable int userId) {
        userMapper.deleteById(userId);
        return "delete user successfully";
    }


}
