package com.example.projectgroup.controller;

import com.example.projectgroup.model.Transaction;
import com.example.projectgroup.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("sale")
@CrossOrigin("*")
public class TransactionController {
    @Autowired
    TransactionService transactionService;

    @PostMapping(value = "/add")
    public Transaction add(@RequestBody Transaction transaction){
    System.out.println(transaction);
        return transactionService.createBuyer(transaction);
    }

    @GetMapping("/getAll")
    public List<Transaction> getAll(){

        return transactionService.getAll();
    }
    @GetMapping("/get")
    public Optional<Transaction> getById(
            @RequestParam("id") Long id){

        return transactionService.getSAle(id);
    }


    @PutMapping("/update")
    public void update(@RequestBody Transaction transaction){
        transactionService.update(transaction);


    }

    @DeleteMapping("/delete")
    void delete(@RequestParam("id") Long id){

        transactionService.delete(id);
    }
}
