package com.example.backend.services;

import com.example.backend.model.Item;

import java.util.List;

public interface ItemService
{
    Item create(Item item);
    List<Item> list(int limit);
    Item get(Long id);
    Item update(Item item);
    Boolean delete(Long id);
    Boolean changeActive(Item item);
}
