package com.ywork.api.dto.out;

import com.ywork.api.responsitory.helper.Col;
import lombok.Data;

@Data
public class UserOut {
    @Col("user_id")
    private String userId;
    @Col("email")
    private String email;
    @Col("name_account")
    private String nameAccount;
    @Col("phone_number")
    private String phoneNumber;
    @Col("avatar")
    private String avatar;
    private String urlAvatar;
}
