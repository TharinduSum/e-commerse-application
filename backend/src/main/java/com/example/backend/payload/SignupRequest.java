package com.example.backend.payload;

import lombok.Data;

@Data
public class SignupRequest {
    private String email;
    private String password;
    private String fullName;
}
