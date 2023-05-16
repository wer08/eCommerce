package com.example.backend.configuration;

import com.example.backend.model.Item;
import jakarta.persistence.PrePersist;

import java.util.Date;

public class ItemEntityListener
{
    @PrePersist
    public void prePersist(Item item) {
        if (item.getDate() == null) {
            item.setDate(new Date());
        }
    }
}
