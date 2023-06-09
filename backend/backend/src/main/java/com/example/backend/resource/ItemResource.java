package com.example.backend.resource;

import com.example.backend.model.Item;
import com.example.backend.model.Response;
import com.example.backend.services.implementation.ItemServiceImpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static java.time.LocalDateTime.now;
import static java.util.Map.of;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/item")
@RequiredArgsConstructor
@Slf4j
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
        log.info(item.toString());
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


    @PutMapping("/update")
    public ResponseEntity<Response> updateItem(@RequestBody @Valid Item item){
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("item",itemService.update(item)))
                        .message("Item updated")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }

//    @PutMapping("/active/{id}")
//    public ResponseEntity<Response> changeActiveItem(@PathVariable Long id){
//        return ResponseEntity.ok(
//                Response.builder()
//                        .timeStamp(now())
//                        .data(of("activityChanged",itemService.changeActive(id)))
//                        .message("Activity changed")
//                        .status(OK)
//                        .statusCode(OK.value())
//                        .build()
//        );
//    }

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
    public ResponseEntity<Response> deleteItem(@PathVariable("id") Long id){
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
