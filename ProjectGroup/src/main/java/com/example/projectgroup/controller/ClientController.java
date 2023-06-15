package com.example.projectgroup.controller;

import com.example.projectgroup.model.Client;
import com.example.projectgroup.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("client")
@CrossOrigin("*")
public class ClientController {
    @Autowired
    ClientService clientService;
    @PostMapping("/add")
    public Client add(@RequestBody Client client){

        return clientService.add(client);
    }

    @GetMapping("/getAll")
    public List<Client> getAll(){

        return clientService.getAll();
    }
    @GetMapping("/get")
    public Optional<Client> getById(
            @RequestParam("id") Long id){

        return clientService.getClient(id);
    }


    @PutMapping("/update")
    public void update(@RequestBody Client client){
        clientService.update(client);


    }

    @DeleteMapping("/delete")
    void delete(@RequestParam("id") Long id){

        clientService.delete(id);
    }
}
