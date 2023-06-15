package com.example.projectgroup.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer contract_id;
    private LocalDate Date;
    private Integer price;


//    @JsonManagedReference
@ManyToOne
@JoinColumn(name = "property_id")
private Property property;

@ManyToOne
@JoinColumn(name = "Buyer_id")
private Client client;

@ManyToOne
@JoinColumn(name = "Seller_id")
private Client seller;



}