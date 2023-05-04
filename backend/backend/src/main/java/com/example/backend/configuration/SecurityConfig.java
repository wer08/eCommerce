package com.example.backend.configuration;


import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.SecurityBuilder;
import org.springframework.security.config.annotation.web.HttpSecurityBuilder;
import org.springframework.security.config.annotation.web.WebSecurityConfigurer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

@Configuration
public class SecurityConfig implements WebSecurityConfigurer
{


    @Override
    public void init(SecurityBuilder builder) throws Exception
    {

    }

    @Override
    public void configure(SecurityBuilder builder) throws Exception
    {

    }
}
