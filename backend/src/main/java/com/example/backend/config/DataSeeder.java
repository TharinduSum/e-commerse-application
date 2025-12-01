package com.example.backend.config;

import com.example.backend.entity.Product;
import com.example.backend.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;

import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.example.backend.entity.Role; // Added this import as it's used in createAdminUser

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(ProductRepository productRepository, UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        return args -> {
            createOrUpdateProduct(productRepository, "Laptop", "High performance laptop", new BigDecimal("999.99"),
                    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80");
            createOrUpdateProduct(productRepository, "Smartphone", "Latest smartphone", new BigDecimal("699.99"),
                    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80");
            createOrUpdateProduct(productRepository, "Headphones", "Noise cancelling headphones",
                    new BigDecimal("199.99"),
                    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80");

            createAdminUser(userRepository, passwordEncoder);
        };
    }

    private void createAdminUser(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        if (userRepository.findByEmail("admin@example.com").isEmpty()) {
            User admin = new User();
            admin.setEmail("admin@example.com");
            admin.setPassword(passwordEncoder.encode("password"));
            admin.setFullName("Admin User");
            admin.setRole(Role.ADMIN);
            userRepository.save(admin);
        }
    }

    private void createOrUpdateProduct(ProductRepository repository, String name, String description, BigDecimal price,
            String imageUrl) {
        // Simple check by name for MVP. In real app, use ID or unique code.
        // Here we just check if any product exists with this name, if so update it,
        // else create.
        // Since we don't have a findByName method exposed yet, we can just fetch all
        // and filter or add the method.
        // For simplicity in this MVP seeder without changing Repository interface:
        // We will just add them if count is 0, OR we can clear and re-add.
        // Let's try to be smarter: find all and check.

        // Actually, let's just add a findByName to the repository to make this clean.
        // But I can't change the repository in this tool call easily without context.
        // I'll just stick to the original logic but update the URLs if the DB is fresh.
        // Since the user already has data, I should probably just update them.
        // I'll fetch all, loop and update if name matches.

        java.util.List<Product> products = repository.findAll();
        boolean found = false;
        for (Product p : products) {
            if (p.getName().equals(name)) {
                p.setDescription(description);
                p.setPrice(price);
                p.setImageUrl(imageUrl);
                repository.save(p);
                found = true;
                break;
            }
        }

        if (!found) {
            Product p = new Product();
            p.setName(name);
            p.setDescription(description);
            p.setPrice(price);
            p.setImageUrl(imageUrl);
            repository.save(p);
        }
    }
}
