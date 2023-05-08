package com.example.backend.services;

import com.example.backend.model.Client;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface ClientService extends UserDetailsService
{
    Client get(Long id);
    List<Client> list();

}
