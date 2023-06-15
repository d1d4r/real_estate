package com.example.projectgroup.repository;


import com.example.projectgroup.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SaleRepo extends JpaRepository<Transaction,Long> {
}
