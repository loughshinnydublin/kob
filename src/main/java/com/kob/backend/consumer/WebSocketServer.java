package com.kob.backend.consumer;

import com.alibaba.fastjson2.JSONObject;
import com.kob.backend.consumer.utils.Game;
import com.kob.backend.consumer.utils.JwtAuthentication;
import com.kob.backend.mapper.UserMapper;
import com.kob.backend.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.Iterator;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArraySet;

@Component
@ServerEndpoint("/websocket/{token}")  // 注意不要以'/'结尾
public class WebSocketServer {


    //线程安全的哈希表，存储userid对应的websocketserver（客户端），定义为全局变量
    private static ConcurrentHashMap<Integer, WebSocketServer> users = new ConcurrentHashMap<>();
    private User user;
    private Session session = null;
    //匹配池。线程安全
    private static final CopyOnWriteArraySet<User> matchpool = new CopyOnWriteArraySet<>();


    //在websocketserver中注入接口
    private static UserMapper userMapper;

    @Autowired
    public void setUserMapper(UserMapper userMapper) {
        WebSocketServer.userMapper = userMapper;
    }

    @OnOpen
    public void onOpen(Session session, @PathParam("token") String token) throws IOException {
        // 建立连接，用session维护每个链接
        this.session = session;
        System.out.println("connected!");

        //假设传入用户id

//        int userId = Integer.parseInt(token);
//        user = userMapper.selectById(userId);
//        users.put(userId, this);

        Integer userId = JwtAuthentication.getUserId(token);
        this.user = userMapper.selectById(userId);

        if (this.user != null) {
            users.put(userId, this);
        } else {
            this.session.close();
        }

        System.out.println(users);


    }

    @OnClose
    public void onClose() {
        // 关闭链接
        System.out.println("disconnected!");

        if (this.user != null) {
            users.remove(this.user.getId());
            matchpool.remove(this.user);

        }

    }

    private void startMatching() {
        System.out.println("startMatching");
        matchpool.add(this.user);


        //简易配对
        while (matchpool.size() >= 2) {
            //迭代器，用于枚举前两个人
            Iterator<User> iterator = matchpool.iterator();
            User a = iterator.next();
            User b = iterator.next();
            matchpool.remove(a);
            matchpool.remove(b);

            //初始化游戏流程
            Game game = new Game(13,14,20);
            game.createMap();


            //传给前端(字典)
            JSONObject respA = new JSONObject();
            respA.put("event", "start-matching");
            respA.put("opponent_username", b.getUsername());
            respA.put("opponent_photo", b.getPhoto());
            respA.put("gamemap", game.getG());
            users.get(a.getId()).sendMessage(respA.toJSONString());   //获取a的链接


            JSONObject respB = new JSONObject();
            respB.put("event", "start-matching");
            respB.put("opponent_username", a.getUsername());
            respB.put("opponent_photo", a.getPhoto());
            respB.put("gamemap", game.getG());
            users.get(b.getId()).sendMessage(respB.toJSONString());
        }
    }

    private void stopMatching() {
        System.out.println("stopMatching");
        matchpool.remove(this.user);
    }

    @OnMessage  //相当于路由
    public void onMessage(String message, Session session) {
        // 从Client接收消息
        System.out.println("received_message!");

        JSONObject data = JSONObject.parseObject(message);

        String event = data.getString("event");
        //减少异常
        if ("start-matching".equals(event)) {
            startMatching();
        } else if ("stop-matching".equals(event)) {
            stopMatching();
        }
    }

    @OnError
    public void onError(Session session, Throwable error) {
        error.printStackTrace();
    }


    //后端向前端发送信息
    public void sendMessage(String message) {
        synchronized (this.session) {
            try {
                this.session.getBasicRemote().sendText(message);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}