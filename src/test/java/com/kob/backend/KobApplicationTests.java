package com.kob.backend;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootTest
class KobApplicationTests {

    @Test
    void contextLoads() {
        PasswordEncoder pw_encoder = new BCryptPasswordEncoder();
        System.out.println(pw_encoder.encode("passwords"));
        System.out.println(pw_encoder.encode("password2"));
        System.out.println(pw_encoder.encode("password3"));
        System.out.println(pw_encoder.encode("password4"));

    }
}
