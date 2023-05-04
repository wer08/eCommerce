package com.example.backend.resource;


import com.example.backend.model.Response;
import com.example.backend.services.implementation.ClientServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static java.time.LocalDateTime.now;
import static java.util.Map.of;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class ClientResource
{
    private final ClientServiceImpl clientService;
    @GetMapping("/get/{id}")
    public ResponseEntity<Response> getUser(@PathVariable("id") Long id){
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("user",clientService.get(id)))
                        .message("Client retrieved")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }
}
