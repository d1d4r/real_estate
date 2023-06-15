package com.example.projectgroup.service;


import com.example.projectgroup.model.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service

public class SaleService {
    @Autowired
    com.example.projectgroup.repository.SaleRepo saleRepo;
    public Transaction createBuyer(Transaction transaction) {
        return saleRepo.save(transaction);
    }

    public List<Transaction> getAll(){

        return saleRepo.findAll();
    }

    public Optional<Transaction> getSAle(Long id){

        return  saleRepo.findById(id);
    }

    public void update( Transaction transaction){

        saleRepo.save(transaction);
    }

    public void delete(Long id){

        saleRepo.deleteById(id);
    }
}
