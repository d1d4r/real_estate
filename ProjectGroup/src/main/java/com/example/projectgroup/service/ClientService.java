package com.example.projectgroup.service;


import com.example.projectgroup.model.Client;
import com.example.projectgroup.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class ClientService {
    @Autowired
    ClientRepository clientRepository;
    public Client add(Client client) {
        return clientRepository.save(client);
    }
    public List<Client> getAll(){

        return clientRepository.findAll();
    }

    public Optional<Client> getClient(Long id){

        return  clientRepository.findById(id);
    }

    public void update( Client client){

        clientRepository.save(client);
    }

    public void delete(Long id){

        clientRepository.deleteById(id);
    }
}
