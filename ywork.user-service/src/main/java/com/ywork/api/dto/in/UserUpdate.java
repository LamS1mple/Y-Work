package com.ywork.api.dto.in;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class UserUpdate {
    private String email;
    private String phone;
    private String fullName;
    private MultipartFile file;
    private String avatar;
}
