package com.example.projectgroup.controller;

import com.example.projectgroup.model.Sale;
import com.example.projectgroup.service.SaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("sale")
public class SaleController {
    @Autowired
    SaleService saleService;

    @PostMapping(value = "/add")
    public Sale add(@RequestBody Sale sale){
    System.out.println(sale);
        return saleService.createBuyer(sale);
    }

    @GetMapping("/getAll")
    public List<Sale> getAll(){

        return saleService.getAll();
    }
    @GetMapping("/get")
    public Optional<Sale> getById(
            @RequestParam("id") Long id){

        return saleService.getSAle(id);
    }


    @PutMapping("/update")
    public void update(@RequestBody Sale sale){
        saleService.update(sale);


    }

    @DeleteMapping("/delete")
    void delete(@RequestParam("id") Long id){

        saleService.delete(id);
    }
}
