package com.example.backend;

import com.example.backend.model.Category;
import com.example.backend.model.Item;
import com.example.backend.model.Client;
import com.example.backend.repo.ItemRepo;
import com.example.backend.repo.ClientRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;

import static com.example.backend.model.Category.*;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}


	@Bean
	CommandLineRunner run(ItemRepo itemRepo, ClientRepo clientRepo){
		return args -> {
			Client client = new Client(null,"wer08","wojtek@mail.pl");
			clientRepo.save(client);
			itemRepo.save(new Item(null, "Random Item 1", "Random Description 1", 4.99, "https://wojtekstorage.blob.core.windows.net/items/eCommerceNoPicture06fc1920-de78-11ed-b693-1356169cbdae.jpg", AGD,client,10));
			itemRepo.save(new Item(null, "Random Item 2", "Random Description 2", 19.99, "https://wojtekstorage.blob.core.windows.net/items/eCommerceed9412d0-deb3-11ed-b079-577496366379.jpg", ITEM, client,10));
			itemRepo.save(new Item(null, "Random Item 3", "Random Description 3", 150, "https://wojtekstorage.blob.core.windows.net/items/eCommerceNoPicture06fc1920-de78-11ed-b693-1356169cbdae.jpg", GROCERY,client,5));
			itemRepo.save(new Item(null, "Random Item 4", "Random description 4", 25.50, "https://wojtekstorage.blob.core.windows.net/items/eCommerceNoPicture06fc1920-de78-11ed-b693-1356169cbdae.jpg", HOME, client,25));
		};
	}

	@Bean
	public CorsFilter corsFilter(){
		UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
		CorsConfiguration corsConfiguration = new CorsConfiguration();
		corsConfiguration.setAllowCredentials(true);
		corsConfiguration.setAllowedOrigins(Arrays.asList("http://localhost:3000","http://localhost:4200","http://localhost:5173"));
		corsConfiguration.setAllowedHeaders(Arrays.asList("Origin","Access-Control-Allow-Origin","Content-Type","Accept",
				"Jwt-Token","Authorization","Origin, Accept","X-Requested-With","Access-Control-Request-Method","Access-Control-Request-Headers"));
		corsConfiguration.setExposedHeaders(Arrays.asList("Origin","Access-Control-Allow-Origin","Content-Type","Accept",
				"Jwt-Token","Authorization","Access-Control-Allow-Credentials"));
		corsConfiguration.setAllowedMethods(Arrays.asList("GET","POST","PUT","PATCH","DELETE","OPTIONS"));
		urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);
		return new CorsFilter(urlBasedCorsConfigurationSource);
	}

}
