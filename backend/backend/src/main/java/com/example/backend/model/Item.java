package com.example.backend.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import static jakarta.persistence.FetchType.EAGER;
import static jakarta.persistence.GenerationType.AUTO;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Item
{

    @Id
    @GeneratedValue(strategy = AUTO)
    private Long id;
    private String name;
    private String description;
    private double price;
    private String picture;
    private Category category;
    @ManyToOne(fetch = EAGER)
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties({"items","authorities"})
    private Client client;
    private int quantity;
}
