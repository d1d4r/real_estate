package com.example.projectgroup.controller;


import com.example.projectgroup.model.Property;
import com.example.projectgroup.service.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("property")
@CrossOrigin("*")
public class PropertyController {
    @Autowired
    PropertyService propertyService;

    @PostMapping("/add")
    public Property add(@RequestBody Property property){

        return propertyService.add(property);
    }

    @GetMapping("/getAll")
    public List<Property> getAll(){

        return propertyService.getAll();
    }
    @GetMapping("/get")
    public Optional<Property> getById(
            @RequestParam("id") Long id){

        return propertyService.getProperty(id);
    }


    @PutMapping("/update")
    public void update(@RequestBody Property property){
        propertyService.update(property);


    }

    @DeleteMapping("/delete")
    void delete(@RequestParam("id") Long id){

        propertyService.delete(id);
    }
    @GetMapping("/getPropertyById")
    public List<Property> getPropertieById(@RequestParam("id") Long id){

        return propertyService.findPropertiesById(id);
    }
    @GetMapping("/getAvailableProperty")
    public List<Property> getAvailableProperty(){

        return propertyService.findAvailableProperty();
    }

    @GetMapping("/getSoldProperty")
    public List<Property> getSoldProperty(){

        return propertyService.findSoldProperty();
    }
}
