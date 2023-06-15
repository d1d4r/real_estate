package com.example.projectgroup.controller;

import com.example.projectgroup.model.Transaction;
import com.example.projectgroup.service.SaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("sale")
@CrossOrigin("*")
public class SaleController {
    @Autowired
    SaleService saleService;

    @PostMapping(value = "/add")
    public Transaction add(@RequestBody Transaction transaction){
    System.out.println(transaction);
        return saleService.createBuyer(transaction);
    }

    @GetMapping("/getAll")
    public List<Transaction> getAll(){

        return saleService.getAll();
    }
    @GetMapping("/get")
    public Optional<Transaction> getById(
            @RequestParam("id") Long id){

        return saleService.getSAle(id);
    }


    @PutMapping("/update")
    public void update(@RequestBody Transaction transaction){
        saleService.update(transaction);


    }

    @DeleteMapping("/delete")
    void delete(@RequestParam("id") Long id){

        saleService.delete(id);
    }
}
