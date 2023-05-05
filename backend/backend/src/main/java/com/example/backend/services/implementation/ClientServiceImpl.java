package com.example.backend.services.implementation;

import com.example.backend.model.Client;
import com.example.backend.repo.ClientRepo;
import com.example.backend.services.ClientService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional
@Slf4j
public class ClientServiceImpl implements ClientService
{
    private final ClientRepo clientRepo;


    @Override
    public Client get(Long id)
    {
        return clientRepo.findById(id).get();
    }

    @Override
    public List<Client> list()
    {
        return clientRepo.findAll().stream().toList();
    }
}
