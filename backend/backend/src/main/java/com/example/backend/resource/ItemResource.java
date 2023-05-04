package com.example.backend.resource;

import com.example.backend.model.Item;
import com.example.backend.model.Response;
import com.example.backend.services.implementation.ItemServiceImpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

import static java.time.LocalDateTime.now;
import static java.util.Map.of;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/item")
@RequiredArgsConstructor
public class ItemResource
{
    private final ItemServiceImpl itemService;

    @GetMapping("/list")
    public ResponseEntity<Response> getItems(){
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("items",itemService.list(30)))
                        .message("Items retrieved")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }

    @PostMapping("/save")
    public ResponseEntity<Response> saveItem(@RequestBody @Valid Item item){
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("item",itemService.create(item)))
                        .message("Item added")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Response> getItem(@PathVariable("id") Long id){
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("item",itemService.get(id)))
                        .message("Item retrieved")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Response> deleteServer(@PathVariable("id") Long id){
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("deleted",itemService.delete(id)))
                        .message("item deleted")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }

}
