package com.example.backend.model;


import com.example.backend.configuration.ItemEntityListener;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

import static jakarta.persistence.EnumType.STRING;
import static jakarta.persistence.FetchType.EAGER;
import static jakarta.persistence.GenerationType.AUTO;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(ItemEntityListener.class)
public class Item
{

    @Id
    @GeneratedValue(strategy = AUTO)
    private Long id;
    private String name;
    private String description;
    private double price;
    private String picture;
    @Enumerated(STRING)
    private Category category;
    @ManyToOne(fetch = EAGER)
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties({"items","authorities"})
    private Client client;
    private int quantity;
    private boolean active;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "date", nullable = false, updatable = false)
    @CreationTimestamp
    private Date date;
}
