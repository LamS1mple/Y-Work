package com.ywork.api.dto.in;

import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
public class CompanyIn {
    private String companyName;
    private String description;
    private String address;
    private String quantityStaff;
    private String ward;
    private MultipartFile avatar;
    private String urlAvatar;
}
