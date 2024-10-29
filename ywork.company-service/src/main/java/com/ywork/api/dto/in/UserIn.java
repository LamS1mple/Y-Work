package com.ywork.api.dto.in;

import lombok.Data;

@Data
public class UserIn {
    private String name_account;
    private String username;
    private String password;
    private String email;
    private String nameAccount;
    private String phoneNumber;
    private Integer roleStatus;
}
