package com.example.projectgroup.service;


import com.example.projectgroup.model.Sale;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service

public class SaleService {
    @Autowired
    com.example.projectgroup.repository.SaleRepo saleRepo;
    public Sale createBuyer(Sale sale) {
        return saleRepo.save(sale);
    }

    public List<Sale> getAll(){

        return saleRepo.findAll();
    }

    public Optional<Sale> getSAle(Long id){

        return  saleRepo.findById(id);
    }

    public void update( Sale sale){

        saleRepo.save(sale);
    }

    public void delete(Long id){

        saleRepo.deleteById(id);
    }
}
