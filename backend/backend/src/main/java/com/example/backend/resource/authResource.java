package com.example.backend.resource;

import com.example.backend.model.AuthenticationRequest;
import com.example.backend.model.RegisterRequest;
import com.example.backend.model.Response;
import com.example.backend.services.implementation.ClientServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static java.time.LocalDateTime.now;
import static java.util.Map.of;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class authResource
{


    private final ClientServiceImpl clientService;
    @PostMapping("/signup")
    public ResponseEntity<Response> register(@RequestBody RegisterRequest request)
    {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("token",clientService.register(request)))
                        .message("Client retrieved")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }
    @PostMapping("/authenticate")
    public ResponseEntity<Response> register(@RequestBody AuthenticationRequest request)
    {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("token",clientService.authenticate(request)))
                        .message("Client retrieved")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }

}
