package com.example.projectgroup.repository;


import com.example.projectgroup.model.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PropertyRepository  extends JpaRepository<Property,Long> {

    //this query used to get all property of one client
    @Query("SELECT p FROM Property p WHERE p.client.id = :id")
    List<Property> findPropertById(@Param("id") Long id);

    //this query uset to get all Available property
    @Query("SELECT p FROM Property p WHERE p.now ='Available'")
    List<Property> availableProperty();

    @Query("SELECT p FROM Property p WHERE p.now ='Sold'")
    List<Property> soldProperty();
}
