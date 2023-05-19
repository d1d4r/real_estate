package com.example.projectgroup.service;


import com.example.projectgroup.model.Property;
import com.example.projectgroup.repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class PropertyService {
    @Autowired
    PropertyRepository propertyRepository;

    public Property add(Property property) {
        return propertyRepository.save(property);
    }
    public List<Property> getAll(){

        return propertyRepository.findAll();
    }

    public Optional<Property> getProperty(Long id){

        return  propertyRepository.findById(id);
    }

    public void update( Property property){

        propertyRepository.save(property);
    }

    public void delete(Long id){

        propertyRepository.deleteById(id);
    }
    public List<Property> findPropertiesById(Long id){

        return propertyRepository.findPropertById(id);
    }
    public List<Property> findAvailableProperty(){

        return propertyRepository.availableProperty();
    }

    public List<Property> findSoldProperty(){

        return propertyRepository.soldProperty();
    }
}
