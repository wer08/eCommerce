package com.example.backend.services.implementation;

import com.example.backend.model.Item;
import com.example.backend.repo.ItemRepo;
import com.example.backend.services.ItemService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

import static java.lang.Boolean.TRUE;
import static org.springframework.data.domain.PageRequest.*;

@RequiredArgsConstructor
@Service
@Transactional
@Slf4j
public class ItemServiceImpl implements ItemService
{
    private final ItemRepo itemRepo;

    @Override
    public Item create(Item item)
    {
        log.info("Added new item: {}",item.getName());

        return itemRepo.save(item);
    }

    @Override
    public List<Item> list(int limit)
    {
        log.info("Fetching all items");
        List<Item> items = itemRepo.findAll(of(0,limit)).toList();
        return items;
    }

    @Override
    public Item get(Long id)
    {
        log.info("Fetching item id: {}",id);
        return itemRepo.findById(id).get();
    }

    @Override
    public Item update(Item item)
    {
        log.info("Updating item id: {}",item.getId());
        Item itemToUpdate = itemRepo.findById(item.getId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        BeanUtils.copyProperties(item,itemToUpdate);
        if(itemToUpdate.getQuantity() == 0){
            itemToUpdate.setActive(false);
        }
        else{
            itemToUpdate.setActive(true);
        }

        return itemRepo.save(itemToUpdate);
    }

    @Override
    public Boolean delete(Long id)
    {
        log.info("Deleting item by Id: {}",id);
        itemRepo.deleteById(id);
        return TRUE;
    }

//    @Override
//    public Boolean changeActive(Long id)
//    {
//
//        log.info("change activity of item id: {}",id);
//        Item itemToUpdate = itemRepo.findById(id)
//                .orElseThrow(() -> new IllegalArgumentException("Item not found"));
//        itemToUpdate.setActive(!itemToUpdate.isActive());
//        itemRepo.save(itemToUpdate);
//
//        return itemToUpdate.isActive();
//    }
}
