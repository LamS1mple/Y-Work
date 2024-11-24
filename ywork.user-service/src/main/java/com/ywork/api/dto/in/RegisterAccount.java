package com.ywork.api.dto.in;

import lombok.Data;

@Data
public class RegisterAccount {
    private String username;
    private String password;
    private String email;
    private String phone;
    private Integer gender;
}
