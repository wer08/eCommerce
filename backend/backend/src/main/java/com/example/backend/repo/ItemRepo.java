package com.example.backend.repo;

import com.example.backend.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepo extends JpaRepository<Item,Long>
{
    Item findByName(String name);
}
