package com.example.backend.services;

import com.example.backend.model.Client;

import java.util.List;

public interface ClientService
{
    Client get(Long id);
    List<Client> list();
}
